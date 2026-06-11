# Strapi Cloud setup

## Overview

The prototype uses Strapi Cloud as the hosted CMS. Local `apps/cms/` is for schema development; published content is fetched at Astro build time from Strapi Cloud.

## Steps

### 1. Create a Strapi Cloud project

1. Sign in at [cloud.strapi.io](https://cloud.strapi.io)
2. Create a new project (Strapi 5)
3. Note the project URL (e.g. `https://your-project.strapiapp.com`)

### 2. Replicate content types

Content types defined locally in `apps/cms/src/`:

- `site-setting` (single type)
- `localized-page` (collection, i18n enabled)
- Components: `shared.seo`, `blocks.hero`, `blocks.feature-grid`, `blocks.cta`, `blocks.testimonial`

Replicate these in Strapi Cloud admin (Content-Type Builder) or use `strapi transfer` when configured.

### 3. Configure locales

In **Settings → Internationalization**, add:

| Locale | Default |
|--------|---------|
| `en-AU` | Yes |
| `en-GB` | |
| `en-CA` | |
| `en-NZ` | |

### 4. API token

1. **Settings → API Tokens → Create new API Token**
2. Type: **Read-only**
3. Copy the token — store in `apps/web/.env` and GitHub Actions secrets

### 5. Environment variables

```env
# apps/web/.env
STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_TOKEN=your-read-only-token
SITE_URL=http://localhost:4321
```

### 6. Public permissions

Ensure the **Public** role can `find` and `findOne` on `localized-page` and `site-setting`.

### 7. CORS (if needed)

Strapi Cloud typically allows build-time fetches from GitHub Actions. For local dev, localhost is usually permitted. Adjust in Strapi admin if requests fail.

## Webhook (optional)

To rebuild the site on publish, configure a Strapi webhook → GitHub `repository_dispatch`. Document in a new ADR when implemented.

## References

- [ADR 001: Strapi Cloud for prototype](../decisions/001-strapi-cloud-for-prototype.md)
