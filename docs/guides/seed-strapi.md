# Seed Strapi from prototype data

Bulk-load Site Settings, Localized Pages, and Articles from the mock data used by the Astro site.

## Prerequisites

1. Strapi Cloud project deployed and admin access working
2. Locales in Strapi: `en-AU`, `en-GB`, `en-CA`, `en-NZ` (Settings → Internationalization)
3. **Full access** API token (Settings → Global settings → API Tokens)

## Setup

Add to `apps/web/.env`:

```env
STRAPI_URL=https://your-project.strapiapp.com
STRAPI_API_CURSOR=your-full-access-token
```

Use a **separate** Full access token for seeding (`STRAPI_API_CURSOR`). Keep the **Read-only** token as `STRAPI_API_TOKEN` for Astro builds.

## Run

```bash
npm install
npm run seed:strapi
```

The script is **idempotent** — re-running updates existing entries matched by `market` + `slug` (pages/articles) or upserts Site Settings per locale.

## What gets seeded

| Content | Count |
|---------|-------|
| Site Settings | 4 locales |
| Localized Pages | 21 pages (international + regional prototype set, incl. nested slugs) |
| Articles | 8 blog posts |
| Market navigations | 5 markets in Site Settings |

Data source: [`apps/web/src/lib/strapi/mock-data.ts`](../../apps/web/src/lib/strapi/mock-data.ts)

## After seeding

1. Set `USE_MOCK_DATA=false` in `apps/web/.env`
2. Verify: `npm run build -w @anzuk/web`
3. Push to `main` (keep `USE_MOCK_DATA=false` in GitHub secrets)

## Troubleshooting

| Error | Fix |
|-------|-----|
| 401 Unauthorized | Token invalid or not Full access |
| 403 Forbidden | Token lacks create/update permissions |
| 404 on content type | Schema not deployed — check Strapi Cloud build from `apps/cms` |
| 400 Bad Request on populate | New block components not in Cloud yet — deploy `apps/cms` schema, then re-seed |
| Locale not found | Add missing locale in Strapi Internationalization settings |
