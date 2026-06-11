# Strapi content mapping

Summary matrix for the prototype CMS schema in `apps/cms`.

## Content types

| Strapi type | Kind | Markets | Purpose |
|-------------|------|---------|---------|
| `localized-page` | Collection | `international`, `au`, `uk`, `ca`, `nz` | All marketing pages |
| `article` | Collection | `au`, `uk`, `ca`, `nz` | Regional blog posts |
| `site-setting` | Single | Global (i18n) | Site name, affiliate URLs, geo settings |

## `localized-page` fields

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Page title |
| `slug` | uid | URL segment (e.g. `who-we-are`, `home`) |
| `market` | enum | `international`, `au`, `uk`, `ca`, `nz` |
| `pageTemplate` | enum | See [page-types.md](page-types.md) |
| `seo` | component | `shared.seo` |
| `canonicalUrl` | string | Optional override |
| `noIndex` | boolean | Default false |
| `body` | dynamic zone | `blocks.hero`, `blocks.feature-grid`, `blocks.cta`, `blocks.testimonial` |
| `jobBoardConfig` | component | Optional; when `pageTemplate` is `job-listing` |

## `article` fields

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | |
| `slug` | uid | |
| `market` | enum | `au`, `uk`, `ca`, `nz` only |
| `excerpt` | text | |
| `body` | richtext | |
| `featuredImage` | media | |
| `seo` | component | `shared.seo` |
| `publishedAt` | datetime | |

## `site-setting` fields

| Field | Type | Notes |
|-------|------|-------|
| `siteName` | string | |
| `tagline` | string | |
| `defaultLocale` | enum | `en-AU` default |
| `organizationUrl` | string | |
| `contactEmail` | email | |
| `scootUrl` | string | `https://scoot.education` |
| `executiveUrl` | string | ANZUK Executive |
| `geoSuggestEnabled` | boolean | Geo-redirect banner |
| `affiliateBrands` | repeatable component | `shared.affiliate-brand` |

## Components

| Component | Used by |
|-----------|---------|
| `shared.seo` | `localized-page`, `article` |
| `shared.affiliate-brand` | `site-setting` |
| `shared.job-board-config` | `localized-page` |
| `blocks.hero` | `localized-page.body` |
| `blocks.feature-grid` | `localized-page.body` |
| `blocks.cta` | `localized-page.body` |
| `blocks.testimonial` | `localized-page.body` |

## URL resolution

| `market` | `slug` | Production URL |
|----------|--------|----------------|
| `international` | `home` | `/` |
| `international` | `{slug}` | `/{slug}/` |
| `au` | `home` | `/au/` |
| `au` | `{slug}` | `/au/{slug}/` |
| `uk` | `home` | `/uk/` |
| `uk` | `{slug}` | `/uk/{slug}/` |
| `ca` | `home` | `/ca/` |
| `ca` | `{slug}` | `/ca/{slug}/` |
| `nz` | `home` | `/nz/` |
| `nz` | `{slug}` | `/nz/{slug}/` |

Articles: `/{market}/blog/{slug}/`

## Explicitly not in Strapi

| Content | Handling |
|---------|----------|
| Jobs | JobAdder API |
| Events | Deferred |
| Team member profiles | Deferred (`staff-member` CPT in WP) |
| Legacy root blog | Ignored |
| Scoot site content | External domain |
| Form submissions | JotForm |

## Market → page count (as-is, approximate)

| Market | Marketing pages | Blog articles |
|--------|-------------------|---------------|
| International | 5 | — |
| Australia | ~30 (incl. children) | Many |
| United Kingdom | ~25 | Many |
| Canada | ~15 | Few |
| New Zealand | ~25 | Many |

Prototype seeds a representative subset — not full migration.
