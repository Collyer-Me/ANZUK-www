# Strapi content mapping

Summary matrix for the CMS schema in `apps/cms`. Architecture decisions: [ADR 008](../decisions/008-strapi-url-nav-model.md).

## Content types

| Strapi type | Kind | Markets | Purpose |
|-------------|------|---------|---------|
| `localized-page` | Collection | `international`, `au`, `uk`, `ca`, `nz` | All marketing pages |
| `article` | Collection | `au`, `uk`, `ca`, `nz` | Regional blog posts |
| `site-setting` | Single | Global (i18n) | Site name, affiliate URLs, geo settings |
| `market-navigation` | Collection | Global | Main navigation menu per market |

## `localized-page` fields

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Page title |
| `slug` | string | Full URL path without market prefix (supports `/` for nested pages) |
| `market` | enum | `international`, `au`, `uk`, `ca`, `nz` |
| `pageTemplate` | enum | See [page-types.md](page-types.md) |
| `showInNav` | boolean | Optional; for future derived navigation |
| `navLabel` | string | Optional nav label override |
| `navOrder` | integer | Optional nav sort order |
| `seo` | component | `shared.seo` |
| `canonicalUrl` | string | Optional override |
| `noIndex` | boolean | Default false |
| `body` | dynamic zone | See block components below |
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

## `market-navigation` fields

| Field | Type | Notes |
|-------|------|-------|
| `market` | enum | `international`, `au`, `uk`, `ca`, `nz` — one entry per market |
| `items` | repeatable component | `shared.nav-item` |

## Components

| Component | Used by |
|-----------|---------|
| `shared.seo` | `localized-page`, `article` |
| `shared.affiliate-brand` | `site-setting` |
| `shared.job-board-config` | `localized-page` |
| `shared.nav-item` | `market-navigation` (top-level links) |
| `shared.nav-link` | `shared.nav-item` (dropdown children) |
| `blocks.hero` | `localized-page.body` |
| `blocks.feature-grid` | `localized-page.body` |
| `blocks.cta` | `localized-page.body` |
| `blocks.testimonial` | `localized-page.body` |
| `blocks.region-grid` | `localized-page.body` |
| `blocks.values-grid` | `localized-page.body` |
| `blocks.form-embed` | `localized-page.body` |
| `blocks.rich-text` | `localized-page.body` |
| `blocks.stats-row` | `localized-page.body` |

## URL resolution

| `market` | `slug` | Production URL |
|----------|--------|----------------|
| `international` | `home` | `/` |
| `international` | `{slug}` | `/{slug}/` |
| `au` | `home` | `/au/` |
| `au` | `{slug}` | `/au/{slug}/` |
| `au` | `parent/child` | `/au/parent/child/` |
| `uk` | `home` | `/uk/` |
| `ca` | `home` | `/ca/` |
| `nz` | `home` | `/nz/` |

Articles: `/{market}/blog/{slug}/`

Strapi stores market-prefixed slugs internally (e.g. `au-who-we-are/meet-the-team`).

## Explicitly not in Strapi

| Content | Handling |
|---------|----------|
| Jobs | JobAdder API |
| Events | Deferred |
| Team member profiles | Deferred (`staff-member` CPT in WP) |
| Legacy root blog | Ignored |
| Scoot site content | External domain |
| Form submissions | JotForm |

## Prototype content

See [`docs/guides/strapi-prototype-spec.md`](../guides/strapi-prototype-spec.md) for the ~16-page prototype shortlist and navigation trees.

## Editor documentation

Marketing editors: [`docs/guides/strapi-editor-guide.md`](../guides/strapi-editor-guide.md)
