# Strapi region model — design and stability rules

**Status:** POC (scalar fields only). Aligns with [ADR 009](../decisions/009-region-relation-content-model.md).

## What went wrong

We iterated the region content type too aggressively during POC:

| Mistake | Effect |
|---------|--------|
| Renamed `collectionName` (`regions` → `site_regions` → `anzuk_regions`) | Strapi tried to **DROP** the old `regions` table on deploy |
| PostgreSQL FKs from `pages`, `articles`, `sections` still pointed at `regions` | Drop failed → **instance won't start** |
| Removed inverse `pages` relation but left `inversedBy` on `page.region` | Metadata validation error on boot |
| Added nav components before base type was stable | Harder to debug 500s |

**Rule:** After the first Strapi Cloud deploy with real data, **never rename** `collectionName`, `singularName`, or `pluralName` on a content type that other types relate to. Treat it like a database migration — plan it, or reset the environment.

## Current model (stable)

### Content type: `api::region.region`

| Setting | Value | Notes |
|---------|-------|-------|
| `collectionName` | `regions` | **Fixed** — matches PostgreSQL table |
| `pluralName` | `regions` | API: `GET /api/regions` |
| `singularName` | `region` | UID: `api::region.region` |
| Draft & Publish | off | ~5 records, config-like |

### Fields (POC)

Scalars only — no header/footer components on region yet:

- `code` (uid from `name`) — `au`, `uk`, `ca`, `nz`, `international`
- `name`, `hreflang`, `isDefault`, `isGlobalHub`
- `contactEmail`, `contactPhone`, `jobAdderBoardId`, `geoSuggestEnabled`, `cookiePolicyUrl`

**Navigation (POC):** use legacy `market-navigation` collection or Astro mock nav until region nav components are added in a **follow-up** change (no `collectionName` changes).

### Relations from other types

**One-way manyToOne (recommended for POC):**

```
page.region   → manyToOne → api::region.region   (no inversedBy)
article.region → manyToOne → api::region.region
section.region → manyToOne → api::region.region (optional)
```

Strapi supports this. You query pages by region filter; you do not need `region.pages` in the admin for the demo.

**Full bidirectional (later, optional):**

If the admin needs “all pages in this region” on the Region entry:

```json
// region — mappedBy only
"pages": { "relation": "oneToMany", "target": "api::page.page", "mappedBy": "region" }

// page — inversedBy must match attribute name on region
"region": { "relation": "manyToOne", "target": "api::region.region", "inversedBy": "pages" }
```

Both sides must exist together. Never remove one without the other.

## Astro / seed / probe

| Layer | Endpoint / key |
|-------|----------------|
| Content API | `/api/regions` |
| Seed script | `client.upsertCollection('regions', ...)` |
| `regions.ts` query | `fetchStrapiOptional('regions', ...)` |
| Page filter | `filters[region][code][$eq]=uk` |

## After deploy checklist

1. Strapi Cloud health check passes (no drop-table errors in logs)
2. `npm run probe:strapi` → `regions: [OK]`
3. Public role: **Region** → `find`, `findOne`
4. `npm run seed:strapi` once
5. `USE_MOCK_DATA=false npm run build -w @anzuk/web`

## Phase 2 (post-demo)

- Add `header` / `footer` components to region (same `collectionName`)
- Optional bidirectional `pages` relation
- Retire V1 `localized-page` + `market` enum fully
- Per-region editor policy (`is-region-editor`) wired to routes

## References

- [Strapi schema v2](../ia/strapi-schema-v2.md)
- [Seed guide](seed-strapi.md)
