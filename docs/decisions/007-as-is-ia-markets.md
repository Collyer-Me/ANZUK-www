# ADR 007: As-is IA markets and CMS boundaries

**Status:** Accepted

**Date:** 2026-06-11

## Context

Production [anzuk.education](https://anzuk.education/) has an international hub plus four regional subsites (`au`, `uk`, `ca`, `nz`). Each region has a similar but distinct page tree. The prototype monorepo initially modelled `au`, `uk`, `us`, `nz` with a region picker at `/` and no international hub pages.

We need an as-is inventory to define a minimal Strapi prototype without committing to future IA changes. Several content types are intentionally excluded (events, legacy blog, jobs in CMS).

## Decision

### Markets

| Market | URL | In Strapi `market` enum |
|--------|-----|-------------------------|
| International hub | `/` | `international` |
| Australia | `/au/` | `au` |
| United Kingdom | `/uk/` | `uk` |
| Canada | `/ca/` | `ca` |
| New Zealand | `/nz/` | `nz` |
| United States | `scoot.education` | **Not in CMS** — external link via `site-setting.scootUrl` |

Replace prototype `/us/` regional routes with Canada (`/ca/`). The region picker links to Scoot for US visitors.

### CMS content boundaries

**In Strapi:**

- `localized-page` — marketing pages per market with `pageTemplate` enum
- `article` — regional blogs at `/{market}/blog/{slug}/` only
- `site-setting` — global config including Scoot and Executive URLs

**Out of Strapi (documented only):**

- Jobs — JobAdder (page shells in Strapi, job data external)
- Events — deferred
- Legacy root-level NZ blog (~118 WP posts at `/slug/`) — ignored
- Team member profiles — deferred
- Scoot site content — separate domain

### Page structure

Each market has its own page tree. `market` field drives URL prefix; Strapi i18n remains for copy within a market. International hub pages use `market: international`.

### As-is documentation

Full inventories live in [`docs/ia/`](../ia/README.md). This ADR captures decisions; the IA docs capture production state.

## Consequences

### Positive

- Prototype aligns with production markets (adds CA, external Scoot)
- Clear CMS boundaries prevent over-scoping Strapi
- `pageTemplate` + `market` supports distinct regional structures
- As-is docs give team a shared reference before IA redesign

### Negative

- Removing `/us/` from prototype may break bookmarks during transition
- International hub coexists with region picker until hub replaces picker content

### Neutral

- Future IA redesign can change page trees without invalidating the content model
- Events and team members can be added later as new collections

## References

- [As-is IA index](../ia/README.md)
- [Strapi mapping](../ia/strapi-mapping.md)
- [External integrations](../ia/external-integrations.md)
- `apps/web/src/config/regions.ts`
- `apps/web/src/config/markets.ts`
