/**
 * Configure Storyblok deploy automation + Visual Editor environments.
 *
 * - Adds GitHub Pages as a second Visual Editor preview environment
 * - Creates/updates a story.published webhook when DISPATCH_PROXY_URL is set
 *
 * Usage (from repo root):
 *   npm run configure:storyblok-deploy
 *
 * Optional env (apps/web/.env or shell):
 *   GITHUB_PAGES_PREVIEW_URL  — default https://collyer-me.github.io/ANZUK-www/
 *   DISPATCH_PROXY_URL        — public HTTPS URL of github-dispatch-proxy.mjs
 *   DISPATCH_WEBHOOK_SECRET   — appended as ?secret= on webhook URL
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MAPI = 'https://mapi.storyblok.com/v1';
const WEBHOOK_NAME = 'GitHub Pages deploy';

function loadEnvFile(path: string): void {
  try {
    const text = readFileSync(path, 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // optional
  }
}

loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));

const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID ?? '293225020771322';
const localPreview = 'https://localhost:4321/';
const ghPagesPreview =
  process.env.GITHUB_PAGES_PREVIEW_URL ?? 'https://collyer-me.github.io/ANZUK-www/';
const proxyUrl = process.env.DISPATCH_PROXY_URL?.replace(/\/$/, '');
const webhookSecret = process.env.DISPATCH_WEBHOOK_SECRET;

if (!token) {
  console.error('Missing STORYBLOK_MANAGEMENT_TOKEN in apps/web/.env');
  process.exit(1);
}

type Json = Record<string, unknown>;

async function mapi<T = Json>(method: string, path: string, body?: Json): Promise<T> {
  const res = await fetch(`${MAPI}${path}`, {
    method,
    headers: {
      Authorization: token!,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data: Json = {};
  if (text) {
    try {
      data = JSON.parse(text) as Json;
    } catch {
      data = { raw: text };
    }
  }

  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 500)}`);
  }

  return data as T;
}

function ensureTrailingSlash(url: string): string {
  return url.endsWith('/') ? url : `${url}/`;
}

async function configurePreviewEnvironments(): Promise<void> {
  const { space } = await mapi<{ space: Json }>('GET', `/spaces/${spaceId}`);
  const existing = (space.environments as { name: string; location: string }[] | null) ?? [];

  const desired = [
    { name: 'Local dev', location: ensureTrailingSlash(localPreview) },
    { name: 'GitHub Pages', location: ensureTrailingSlash(ghPagesPreview) },
  ];

  const merged = [...existing];
  for (const env of desired) {
    const idx = merged.findIndex((e) => e.name === env.name);
    if (idx === -1) {
      merged.push(env);
    } else if (merged[idx].location !== env.location) {
      merged[idx] = env;
    }
  }

  await mapi('PUT', `/spaces/${spaceId}`, {
    space: {
      domain: ensureTrailingSlash(localPreview),
      environments: merged,
    },
  });

  console.log('✓ Visual Editor environments:');
  for (const env of merged) {
    console.log(`  - ${env.name}: ${env.location}`);
  }
}

async function configureWebhook(): Promise<void> {
  if (!proxyUrl) {
    console.log('\n⊘ Skipping webhook (set DISPATCH_PROXY_URL to enable)');
    console.log('  Host scripts/github-dispatch-proxy.mjs, then re-run this script.');
    return;
  }

  const endpoint =
    webhookSecret && !proxyUrl.includes('secret=')
      ? `${proxyUrl}?secret=${encodeURIComponent(webhookSecret)}`
      : proxyUrl;

  const { webhook_endpoints } = await mapi<{ webhook_endpoints: Json[] }>(
    'GET',
    `/spaces/${spaceId}/webhook_endpoints/`,
  );

  const existing = webhook_endpoints.find((w) => w.name === WEBHOOK_NAME);

  const payload = {
    webhook_endpoint: {
      name: WEBHOOK_NAME,
      endpoint,
      activated: true,
      actions: ['story.published'],
      ...(webhookSecret ? { secret: webhookSecret } : {}),
    },
  };

  if (existing?.id) {
    await mapi('PUT', `/spaces/${spaceId}/webhook_endpoints/${existing.id}`, payload);
    console.log(`\n✓ Updated webhook "${WEBHOOK_NAME}" → ${endpoint}`);
  } else {
    await mapi('POST', `/spaces/${spaceId}/webhook_endpoints/`, payload);
    console.log(`\n✓ Created webhook "${WEBHOOK_NAME}" → ${endpoint}`);
  }
}

async function main(): Promise<void> {
  console.log(`Configuring Storyblok space ${spaceId}…\n`);
  await configurePreviewEnvironments();
  await configureWebhook();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
