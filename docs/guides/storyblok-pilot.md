# Storyblok pilot guide

Pilot migration from Strapi to [Storyblok](https://www.storyblok.com) for two AU pages, following the [official Astro integration guide](https://www.storyblok.com/docs/guides/astro).

## Pilot scope

| Story slug | Live URL | Content |
|------------|----------|---------|
| `au/home` | `/au/` | Hero, stats row, feature grid, CTA |
| `au/who-we-are` | `/au/who-we-are/` | Hero, rich text |

All other routes use bundled mock content in `apps/web/src/lib/cms/mock-data.ts`.

## Your action items (Storyblok setup)

### 1. Create a Storyblok space

1. Sign in at [app.storyblok.com](https://app.storyblok.com)
2. Create a new space (blank is fine)
3. Note your **space region** (`eu`, `us`, `ca`, `ap`, `cn`) — set `STORYBLOK_REGION` in `.env` to match

### 2. Create the `page` content type

In **Block Library**, create a content type blok named **`page`** (Technical name: `page`) with:

| Field | Type | Technical name |
|-------|------|----------------|
| Title | Text | `title` |
| Page type | Single option | `page_type` — options: `home-regional`, `about` |
| SEO | Blok (nestable) | `seo` — fields: `meta_title`, `meta_description` |
| Body | Blocks | `body` — whitelist bloks below |

### 3. Create nestable bloks

Register these in Block Library (technical names must match):

| Blok | Technical name | Key fields |
|------|----------------|------------|
| Hero | `hero` | `heading`, `subheading`, `cta_label`, `cta_url`, `variant` (default/dark) |
| Stats row | `stats-row` | `stats` (blocks → `stat-item`) |
| Stat item | `stat-item` | `value`, `label` |
| Feature grid | `feature-grid` | `heading`, `features` (blocks → `feature-item`) |
| Feature item | `feature-item` | `title`, `description`, `icon` (teaching/support/global/community) |
| CTA | `cta` | `heading`, `body`, `button_label`, `button_url`, `variant` (primary/dark) |
| Rich text | `rich-text` | `content` (richtext) |

Astro components live in [`apps/web/src/storyblok/`](../apps/web/src/storyblok/) and are registered in [`astro.config.mjs`](../apps/web/astro.config.mjs).

### 4. Create stories

| Story | Full slug | Real path (Visual Editor) |
|-------|-----------|---------------------------|
| AU Home | `au/home` | `/au/` |
| AU Who we are | `au/who-we-are` | `/au/who-we-are/` |

Copy content from the mock AU pages in [`mock-data.ts`](../apps/web/src/lib/cms/mock-data.ts).

### 5. Access tokens

**Delivery (read)** — for the Astro site:

1. **Settings → Access tokens**
2. Copy the **Preview** token → `STORYBLOK_DELIVERY_API_TOKEN` in `apps/web/.env`

**Management (write)** — for the seed script only:

1. Open [Personal access tokens](https://app.storyblok.com/#/me/account?tab=token) (My account → Account settings)
2. **Generate new token**
3. Scopes: **components**, **stories**
4. Restrict to your **ANZUK Group** space only
5. Add to `apps/web/.env`:

```env
STORYBLOK_MANAGEMENT_TOKEN=your-personal-access-token
STORYBLOK_SPACE_ID=293225020771322
```

6. Run from repo root:

```bash
npm run seed:storyblok
```

This creates all pilot bloks, the `au` folder, and publishes `au/home` + `au/who-we-are` with mock content.

> Never paste management tokens in chat or commit them. Revoke and regenerate if exposed.

### 6. Visual Editor

The codebase is already wired for Visual Editor per [Visual Preview in Astro](https://www.storyblok.com/docs/guides/astro/visual-preview) and [Visual Editor concepts](https://www.storyblok.com/docs/concepts/visual-editor):

- `livePreview: true` in dev (`astro.config.mjs`)
- HTTPS via `vite-plugin-mkcert`
- `storyblokEditable()` on all pilot blok components
- `getPayload()` + draft content on AU pilot routes
- Story **Real paths** set by `npm run seed:storyblok` (`/au/`, `/au/who-we-are/`)

#### Storyblok space settings (you do this once)

1. **Settings → Visual Editor**
2. Set **Default environment** / **Preview URL** to:

   ```
   https://localhost:4321
   ```

   Use `https` (not `http`) — [Storyblok requires HTTPS for preview](https://www.storyblok.com/docs/concepts/visual-editor#ssl-certificate).

3. Save

#### Local `.env`

```env
SITE_URL=https://localhost:4321
STORYBLOK_DELIVERY_API_TOKEN=<preview-token>
STORYBLOK_REGION=eu
```

Use the **Preview** access token (not Public) so draft edits appear in the Visual Editor.

#### Open the Visual Editor

1. From repo root: `npm run dev`
2. In your browser, open **https://localhost:4321/au/** once and accept the mkcert certificate (Advanced → Proceed)
3. In Storyblok, open **Content → au → AU Home**
4. Click **Open Visual Editor** (or the eye icon)
5. The preview should load `/au/` in the iframe

Repeat for **AU Who we are** → should preview `/au/who-we-are/`.

#### What you should see when it works

- Page renders inside Storyblok’s iframe
- Outlines appear around bloks on hover
- Clicking a blok in the preview opens that block in the editor sidebar
- Saving in Storyblok refreshes the preview (live preview bridge)

#### Troubleshooting

| Symptom | Fix |
|---------|-----|
| Blank preview / certificate error | Open https://localhost:4321/au/ in a new tab first and accept the cert |
| Preview shows `/au/home` 404 | Open story **Config** → set **Real path** to `/au/` (seed script should already set this) |
| Preview loads but bloks aren’t clickable | Confirm `npm run dev` is running (server mode, not `npm run build`) |
| Changes don’t appear live | Use Preview token; check `STORYBLOK_DELIVERY_API_TOKEN` in `apps/web/.env` |
| Toolbar failed to load | Restart dev server after config changes |

#### Production preview (GitHub Pages)

A second Visual Editor environment points at the live GitHub Pages site so editors can preview published content in production layout.

| Environment | URL | Live editing |
|-------------|-----|--------------|
| Local dev | `https://localhost:4321/` | Yes (`npm run dev`) |
| GitHub Pages | `https://collyer-me.github.io/ANZUK-www/` | No (static published build) |

Configure via script (uses Management API):

```bash
npm run configure:storyblok-deploy
```

Or manually in **Settings → Visual Editor → Preview URLs** — add **GitHub Pages** with the URL above. Switch environments in the Visual Editor toolbar when previewing a story.

## Auto-deploy on publish

Storyblok cannot call GitHub `repository_dispatch` directly. Use the included proxy:

### 1. GitHub secrets (you add these)

| Secret | Value |
|--------|-------|
| `STORYBLOK_DELIVERY_API_TOKEN` | **Public** token (published content at build time) |
| `STORYBLOK_REGION` | `eu` |
| `SITE_URL` | `https://collyer-me.github.io/ANZUK-www` |
| `BASE_PATH` | `/ANZUK-www` |

### 2. Host the dispatch proxy

Deploy `scripts/github-dispatch-proxy.mjs` to any HTTPS host (Railway, Fly.io, Azure Container Apps, etc.):

```bash
GITHUB_DISPATCH_PAT=<fine-grained PAT with Actions write>
GITHUB_REPO=Collyer-Me/ANZUK-www
WEBHOOK_SECRET=<optional shared secret>
node scripts/github-dispatch-proxy.mjs
```

The PAT is **not** a GitHub Actions secret — it runs on your proxy host only.

### 3. Wire Storyblok webhook

Add to `apps/web/.env`:

```env
DISPATCH_PROXY_URL=https://your-proxy.example.com
DISPATCH_WEBHOOK_SECRET=<same as WEBHOOK_SECRET on proxy>
```

Then:

```bash
npm run configure:storyblok-deploy
```

This creates a `story.published` webhook → proxy → `repository_dispatch` (`storyblok-publish`) → `.github/workflows/deploy-pages.yml`.

Until the proxy is live, deploys still run on every push to `main` and via **Actions → Deploy to GitHub Pages → Run workflow**.

## Local development

```bash
npm install
npm run dev          # server mode + live preview (https://localhost:4321)
npm run build        # static build (published stories when token set, else mocks)
```

- **Dev** uses `output: 'server'` for Storyblok live preview + `getPayload`
- **Build** uses `output: 'static'` for GitHub Pages

## CI / GitHub Pages

Add repository secrets (see [GitHub Pages deploy](github-pages-deploy.md)):

| Secret | Value |
|--------|-------|
| `STORYBLOK_DELIVERY_API_TOKEN` | Public token (published content at build) |
| `STORYBLOK_REGION` | Your space region (e.g. `eu`) |
| `SITE_URL` | `https://collyer-me.github.io/ANZUK-www` |
| `BASE_PATH` | `/ANZUK-www` |

Optional: Storyblok publish webhook → auto-deploy — see **Auto-deploy on publish** above.

## Forms

Storyblok does not store form submissions. Lead forms (not on pilot pages) POST to `PUBLIC_FORM_ENDPOINT` when configured (Formspree, Azure Function, etc.).

## Further reading

- [Integrate Astro with Storyblok](https://www.storyblok.com/docs/guides/astro)
- [Visual Preview in Astro](https://www.storyblok.com/docs/guides/astro/visual-preview)
- [Dynamic Routing in Astro](https://www.storyblok.com/docs/guides/astro/dynamic-routing)
