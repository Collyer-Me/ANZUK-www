# Strapi Cloud setup

## Overview

The prototype uses Strapi Cloud as the hosted CMS. Local `apps/cms/` is for schema development; published content is fetched at Astro build time from Strapi Cloud.

## Steps

### 1. Create a Strapi Cloud project

1. Sign in at [cloud.strapi.io](https://cloud.strapi.io)
2. Create a new project (Strapi 5)
3. Note the project URL (e.g. `https://your-project.strapiapp.com`)

### 2. Connect Git (recommended)

| Setting | Value |
|---------|--------|
| Repository | `Collyer-Me/ANZUK-www` |
| Branch | `main` |
| **Base directory** | `apps/cms` |

**Important:** `apps/cms` is a **standalone** npm package (not an npm workspace). Strapi Cloud requires `@strapi/strapi` in `apps/cms/node_modules`. If you see *"Strapi was not found in the project dependencies"*, the base directory is wrong or CMS was incorrectly hoisted to the monorepo root.

`apps/cms` has its own `package-lock.json` — do not remove it.

### 3. Replicate content types (if not using Git import)

Content types defined locally in `apps/cms/src/`:

- `site-setting` (single type) — includes `marketNavigations`
- `localized-page` (collection, i18n enabled)
- `article` (collection, i18n enabled)
- Components: `shared.seo`, `shared.nav-item`, `shared.market-navigation`, `blocks.hero`, `blocks.feature-grid`, `blocks.cta`, `blocks.testimonial`, `blocks.region-grid`, `blocks.values-grid`, `blocks.form-embed`, `blocks.rich-text`, `blocks.stats-row`

Replicate these in Strapi Cloud admin (Content-Type Builder) or deploy via Git sync from `apps/cms` on `main`.

### 4. Configure locales

In **Settings → Internationalization**, add:

| Locale | Default |
|--------|---------|
| `en-AU` | Yes |
| `en-GB` | |
| `en-CA` | |
| `en-NZ` | |

### 5. API token

1. **Settings → API Tokens → Create new API Token**
2. Type: **Read-only**
3. Copy the token — store in `apps/web/.env` and GitHub Actions secrets

### 6. Environment variables

```env
# apps/web/.env
STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your-read-only-token
SITE_URL=http://localhost:4321
```

### 7. Public permissions

Ensure the **Public** role can `find` and `findOne` on `localized-page` and `site-setting`.

### 8. CORS (browser form submissions)

CORS is **not** in the Strapi admin UI. On Strapi Cloud it is configured in code:

`apps/cms/config/env/production/middlewares.ts`

That file must list every middleware (it replaces the global `config/middlewares.ts` on Cloud). The repo includes `https://collyer-me.github.io` for GitHub Pages lead-form POSTs.

After changing CORS, push to `main` — Strapi Cloud redeploys from `apps/cms` automatically.

Optional: add more origins by editing the `origin` array in that file and pushing again.

To verify CORS after deploy:

```bash
curl -i -X OPTIONS "https://your-project.strapiapp.com/api/leads/submit" \
  -H "Origin: https://collyer-me.github.io" \
  -H "Access-Control-Request-Method: POST"
```

Expect `Access-Control-Allow-Origin: https://collyer-me.github.io` in the response.

## Webhook (optional)

To rebuild the site on publish, configure a Strapi webhook → GitHub `repository_dispatch`. Document in a new ADR when implemented.

## References

- [ADR 001: Strapi Cloud for prototype](../decisions/001-strapi-cloud-for-prototype.md)
