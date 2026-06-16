/**
 * Seed Storyblok pilot bloks + AU stories via the Management API.
 *
 * Requires a Personal Access Token (NOT the preview/delivery token):
 *   My account → Account settings → Personal access tokens
 *   Scopes: components, stories | Space: ANZUK Group only
 *
 * Usage (from repo root):
 *   npm run seed:storyblok
 */
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const MAPI = 'https://mapi.storyblok.com/v1';

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
    // optional file
  }
}

loadEnvFile(resolve(process.cwd(), 'apps/web/.env'));

const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const spaceId = process.env.STORYBLOK_SPACE_ID ?? '293225020771322';

if (!token) {
  console.error(
    'Missing STORYBLOK_MANAGEMENT_TOKEN in apps/web/.env\n' +
      'Create one at: https://app.storyblok.com/#/me/account?tab=token\n' +
      'Scopes needed: components, stories (restrict to your ANZUK space)',
  );
  process.exit(1);
}

const uid = () => randomUUID();

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

function textField(pos: number, description?: string) {
  return { type: 'text', pos, ...(description ? { description } : {}) };
}

function textareaField(pos: number) {
  return { type: 'textarea', pos };
}

function optionField(pos: number, options: Array<{ name: string; value: string }>, defaultValue?: string) {
  return {
    type: 'option',
    pos,
    options,
    ...(defaultValue ? { default_value: defaultValue } : {}),
  };
}

function bloksField(pos: number, whitelist: string[]) {
  return {
    type: 'bloks',
    pos,
    restrict_components: true,
    component_whitelist: whitelist,
  };
}

const COMPONENTS: Array<{
  name: string;
  display_name: string;
  is_root: boolean;
  is_nestable: boolean;
  schema: Record<string, unknown>;
}> = [
  {
    name: 'stat-item',
    display_name: 'Stat item',
    is_root: false,
    is_nestable: true,
    schema: {
      value: textField(0, 'e.g. 20+'),
      label: textField(1, 'e.g. Years in education'),
    },
  },
  {
    name: 'feature-item',
    display_name: 'Feature item',
    is_root: false,
    is_nestable: true,
    schema: {
      title: textField(0),
      description: textareaField(1),
      icon: optionField(2, [
        { name: 'Teaching', value: 'teaching' },
        { name: 'Support', value: 'support' },
        { name: 'Global', value: 'global' },
        { name: 'Community', value: 'community' },
      ], 'teaching'),
    },
  },
  {
    name: 'hero',
    display_name: 'Hero',
    is_root: false,
    is_nestable: true,
    schema: {
      heading: textField(0),
      subheading: textareaField(1),
      cta_label: textField(2),
      cta_url: textField(3, 'Relative path e.g. browse-jobs'),
      variant: optionField(4, [
        { name: 'Default', value: 'default' },
        { name: 'Dark', value: 'dark' },
      ], 'default'),
    },
  },
  {
    name: 'stats-row',
    display_name: 'Stats row',
    is_root: false,
    is_nestable: true,
    schema: {
      stats: bloksField(0, ['stat-item']),
    },
  },
  {
    name: 'feature-grid',
    display_name: 'Feature grid',
    is_root: false,
    is_nestable: true,
    schema: {
      heading: textField(0),
      features: bloksField(1, ['feature-item']),
    },
  },
  {
    name: 'cta',
    display_name: 'CTA',
    is_root: false,
    is_nestable: true,
    schema: {
      heading: textField(0),
      body: textareaField(1),
      button_label: textField(2),
      button_url: textField(3, 'Relative path e.g. register-to-teach'),
      variant: optionField(4, [
        { name: 'Primary', value: 'primary' },
        { name: 'Dark', value: 'dark' },
      ], 'primary'),
    },
  },
  {
    name: 'rich-text',
    display_name: 'Rich text',
    is_root: false,
    is_nestable: true,
    schema: {
      content: textareaField(0),
    },
  },
  {
    name: 'page',
    display_name: 'Page',
    is_root: true,
    is_nestable: false,
    schema: {
      title: textField(0),
      page_type: optionField(1, [
        { name: 'Home (regional)', value: 'home-regional' },
        { name: 'About', value: 'about' },
      ], 'home-regional'),
      meta_title: textField(2),
      meta_description: textareaField(3),
      body: bloksField(4, ['hero', 'stats-row', 'feature-grid', 'cta', 'rich-text']),
    },
  },
];

function auHomeContent() {
  return {
    component: 'page',
    title: 'ANZUK Education — Australia',
    page_type: 'home-regional',
    meta_title: 'ANZUK Education — Australia - ANZUK Education',
    meta_description: 'ANZUK Education — ANZUK Education — Australia',
    body: [
      {
        _uid: uid(),
        component: 'hero',
        heading: 'Welcome to ANZUK Australia',
        subheading:
          'Connecting passionate educators with schools across the globe. Local expertise, international reach.',
        cta_label: 'Browse jobs',
        cta_url: 'browse-jobs',
        variant: 'default',
      },
      {
        _uid: uid(),
        component: 'stats-row',
        stats: [
          { _uid: uid(), component: 'stat-item', value: '20+', label: 'Years in education' },
          { _uid: uid(), component: 'stat-item', value: '5', label: 'Markets worldwide' },
          { _uid: uid(), component: 'stat-item', value: '1000s', label: 'Educators placed' },
          { _uid: uid(), component: 'stat-item', value: '24/7', label: 'Consultant support' },
        ],
      },
      {
        _uid: uid(),
        component: 'feature-grid',
        heading: 'Why ANZUK?',
        features: [
          {
            _uid: uid(),
            component: 'feature-item',
            title: 'Expert placement',
            description: 'Dedicated consultants who understand your local education market.',
            icon: 'teaching',
          },
          {
            _uid: uid(),
            component: 'feature-item',
            title: 'Ongoing support',
            description: 'We stay with you from application through placement and beyond.',
            icon: 'support',
          },
          {
            _uid: uid(),
            component: 'feature-item',
            title: 'Global network',
            description: 'Part of an international group with deep roots in each region we serve.',
            icon: 'global',
          },
        ],
      },
      {
        _uid: uid(),
        component: 'cta',
        heading: 'Ready to take the next step?',
        body: 'Register with ANZUK and discover opportunities matched to your skills and goals.',
        button_label: 'Get started',
        button_url: 'register-to-teach',
        variant: 'primary',
      },
    ],
  };
}

function auWhoWeAreContent() {
  return {
    component: 'page',
    title: 'Who we are',
    page_type: 'about',
    meta_title: 'Who we are - ANZUK Education',
    meta_description: 'ANZUK Education — Who we are',
    body: [
      {
        _uid: uid(),
        component: 'hero',
        heading: 'Making a global impact since 2004',
        subheading: 'The ANZUK story.',
        cta_label: '',
        cta_url: '',
        variant: 'default',
      },
      {
        _uid: uid(),
        component: 'rich-text',
        content:
          '<p>ANZUK Education connects passionate educators with schools across Australia and around the world. Since 2004, we have built lasting relationships with educators and school leaders.</p><p>Our consultants understand local education markets and provide support from first enquiry through placement and beyond.</p>',
      },
    ],
  };
}

interface StoryRow {
  id: number;
  name: string;
  slug: string;
  full_slug: string;
  is_folder?: boolean;
  parent_id?: number | null;
  path?: string | null;
}

async function listStories(): Promise<StoryRow[]> {
  const stories: StoryRow[] = [];
  let page = 1;
  for (;;) {
    const res = await mapi<{ stories: StoryRow[] }>(
      'GET',
      `/spaces/${spaceId}/stories?page=${page}&per_page=100`,
    );
    stories.push(...res.stories);
    if (res.stories.length < 100) break;
    page += 1;
  }
  return stories;
}

async function ensureComponents(): Promise<void> {
  const existing = await mapi<{ components: Array<{ name: string }> }>(
    'GET',
    `/spaces/${spaceId}/components/`,
  );
  const names = new Set(existing.components.map((c) => c.name));

  for (const def of COMPONENTS) {
    if (names.has(def.name)) {
      console.log(`  component exists: ${def.name}`);
      continue;
    }
    await mapi('POST', `/spaces/${spaceId}/components/`, {
      component: {
        name: def.name,
        display_name: def.display_name,
        is_root: def.is_root,
        is_nestable: def.is_nestable,
        schema: def.schema,
      },
    });
    console.log(`  created component: ${def.name}`);
  }
}

async function ensureFolder(slug: string, name: string, stories: StoryRow[]): Promise<number> {
  const found = stories.find((s) => s.is_folder && s.slug === slug);
  if (found) {
    console.log(`  folder exists: ${slug} (id ${found.id})`);
    return found.id;
  }

  const res = await mapi<{ story: StoryRow }>('POST', `/spaces/${spaceId}/stories`, {
    story: { name, slug, is_folder: true },
  });
  console.log(`  created folder: ${slug} (id ${res.story.id})`);
  return res.story.id;
}

async function upsertStory(
  stories: StoryRow[],
  opts: {
    name: string;
    slug: string;
    parentId: number;
    path: string;
    content: Json;
  },
): Promise<void> {
  const fullSlug = `au/${opts.slug}`;
  const existing = stories.find((s) => s.full_slug === fullSlug || s.slug === opts.slug && s.parent_id === opts.parentId);

  if (existing) {
    await mapi('PUT', `/spaces/${spaceId}/stories/${existing.id}`, {
      story: {
        name: opts.name,
        slug: opts.slug,
        parent_id: opts.parentId,
        path: opts.path,
        content: opts.content,
      },
      publish: 1,
    });
    console.log(`  updated + published story: ${fullSlug}`);
    return;
  }

  await mapi('POST', `/spaces/${spaceId}/stories`, {
    story: {
      name: opts.name,
      slug: opts.slug,
      parent_id: opts.parentId,
      path: opts.path,
      content: opts.content,
    },
    publish: 1,
  });
  console.log(`  created + published story: ${fullSlug}`);
}

async function main(): Promise<void> {
  console.log(`Seeding Storyblok space ${spaceId}…\n`);

  console.log('Components:');
  await ensureComponents();

  console.log('\nStories:');
  let stories = await listStories();
  const auFolderId = await ensureFolder('au', 'Australia', stories);
  stories = await listStories();

  await upsertStory(stories, {
    name: 'AU Home',
    slug: 'home',
    parentId: auFolderId,
    path: '/au/',
    content: auHomeContent(),
  });

  await upsertStory(stories, {
    name: 'AU Who we are',
    slug: 'who-we-are',
    parentId: auFolderId,
    path: '/au/who-we-are/',
    content: auWhoWeAreContent(),
  });

  console.log('\nDone. Verify:');
  console.log('  npm run dev');
  console.log('  https://localhost:4321/au/');
  console.log('  https://localhost:4321/au/who-we-are/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
