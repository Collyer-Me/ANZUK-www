# ADR 008: Strapi URL and navigation model

## Status

Accepted

## Context

The prototype used flat page slugs and hardcoded navigation derived from published pages. Production sites use nested URLs (e.g. `/au/who-we-are/meet-the-team/`) and market-specific navigation trees that marketing must edit without developer involvement.

## Decision

### URL model — full-path slug (Option A)

Store the complete URL path (excluding market prefix) in the `slug` field:

- International: `browse-jobs` → `/browse-jobs/`
- Regional: `who-we-are/meet-the-team` → `/au/who-we-are/meet-the-team/`

The field type is `string` (not `uid`) to allow `/` segments. Strapi UIDs remain market-prefixed internally via `toStrapiSlug()` (e.g. `au-who-we-are/meet-the-team`).

### Navigation — CMS-managed per market (Option A)

Navigation lives in **Site Settings** as repeatable `shared.market-navigation` components, each scoped to a `market` enum with nested `shared.nav-item` entries (label, URL, optional children).

Marketing editors update nav in Strapi admin without code changes. Astro resolves relative URLs using `pageUrl()` and market prefix.

### Page metadata — derived nav fallback

`localized-page` includes optional `showInNav`, `navLabel`, and `navOrder` fields for future auto-generated navigation. Primary nav source remains Site Settings for the prototype.

### Block model — section blocks with template guidance

Pages use a free-form dynamic zone of section-level blocks. `pageTemplate` is metadata for frontend branching (e.g. job listings) and editor documentation — not a hard constraint in Strapi.

## Consequences

- Astro `[...slug].astro` routes nested paths via catch-all params
- Seed script and mock data use full-path slugs where needed
- International and regional headers read nav from `getSiteSettings()`
- Editors must use lowercase hyphenated slugs matching production URL paths

## References

- [`docs/ia/strapi-mapping.md`](../ia/strapi-mapping.md)
- [`docs/guides/strapi-prototype-spec.md`](../guides/strapi-prototype-spec.md)
