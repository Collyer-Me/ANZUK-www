/**
 * Minimal webhook proxy: Storyblok publish → GitHub repository_dispatch.
 *
 * Storyblok cannot POST directly to GitHub's repository_dispatch API (body format
 * differs). Host this script on any HTTPS endpoint and point a Storyblok webhook
 * at it.
 *
 * Required env:
 *   GITHUB_DISPATCH_PAT  — fine-grained or classic PAT with repo + Actions write
 *   GITHUB_REPO            — e.g. Collyer-Me/ANZUK-www
 *
 * Optional:
 *   PORT                   — default 8787
 *   WEBHOOK_SECRET         — if set, require ?secret= query param on incoming POST
 *   DISPATCH_EVENT_TYPE    — default storyblok-publish
 *
 * Run:
 *   node scripts/github-dispatch-proxy.mjs
 */
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';

const port = Number(process.env.PORT ?? 8787);
const pat = process.env.GITHUB_DISPATCH_PAT;
const repo = process.env.GITHUB_REPO ?? 'Collyer-Me/ANZUK-www';
const webhookSecret = process.env.WEBHOOK_SECRET;
const eventType = process.env.DISPATCH_EVENT_TYPE ?? 'storyblok-publish';

if (!pat) {
  console.error('Missing GITHUB_DISPATCH_PAT');
  process.exit(1);
}

async function triggerDeploy(payload) {
  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: eventType,
      client_payload: payload,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub dispatch ${res.status}: ${text.slice(0, 300)}`);
  }
}

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method not allowed');
    return;
  }

  const url = new URL(req.url ?? '/', `http://localhost:${port}`);
  if (webhookSecret && url.searchParams.get('secret') !== webhookSecret) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');

  let storyblok = {};
  try {
    storyblok = raw ? JSON.parse(raw) : {};
  } catch {
    // Storyblok may send non-JSON in edge cases; still trigger deploy
  }

  const action = storyblok?.action ?? storyblok?.text ?? 'story.published';
  const storyId = storyblok?.story_id ?? storyblok?.story?.id;

  try {
    await triggerDeploy({
      source: 'storyblok',
      action,
      story_id: storyId,
      received_at: new Date().toISOString(),
      request_id: randomUUID(),
    });
    res.writeHead(202, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, event_type: eventType }));
  } catch (err) {
    console.error(err);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: String(err) }));
  }
});

server.listen(port, () => {
  console.log(`GitHub dispatch proxy listening on :${port}`);
  console.log(`Target repo: ${repo} → event_type: ${eventType}`);
});
