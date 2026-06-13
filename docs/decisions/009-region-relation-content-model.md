# ADR 009: Region-as-relation content model, i18n reserved for language

**Status:** Accepted

**Date:** 2026-06-13

**Supersedes:** parts of [ADR 008](008-strapi-url-nav-model.md) (slug/UID strategy, navigation model)

## Context

The prototype Strapi model (Strapi 5.48) encodes a site's **region** (au, uk, ca, nz, international) as a Strapi **i18n locale** (en-AU, en-GB, en-CA, en-NZ), *and* duplicates that on a `market` enum present on every content type. Region and locale are therefore the same axis, expressed twice.

This is the wrong axis. The four regional sites are not translations of one another — they are parallel **English** sites with different services, sectors, legal pages, and job markets. Strapi i18n exists for translation (one entry, multiple languages). Spending it on region produces concrete problems:

- **No room for real translation.** Canada is officially bilingual; the moment `/ca/fr/` is requested there is no language axis left, because `ca` *is* the `en-CA` locale. Same blocker for te reo Māori in NZ.
- **i18n "localizations" links are semantically false.** Strapi treats linked locales as translations of one entry, so an AU page and a UK page get linked as if one is the British translation of the other. They are not, which misleads editors and pollutes hreflang.
- **It forces hacks.** International content is hardcoded to `en-AU`; navigation cannot be localized; slug uniqueness relies on an opaque `{market}-{slug}` prefix that editors never see but must respect.
- **It fights the editor mental model.** Marketers run "the UK site"; they do not author "the en-GB translation of a canonical page."

A team decision (2026-06-13) also set direction: plan for genuine translation later; **per-region editors** with scoped access; live **preview + publish-triggered rebuild** required now; a **proper page hierarchy** (not flat path strings).

Content cost to change is ~zero: the seed is empty and only mock data exists.

## Decision

1. **Region becomes a first-class `region` collection type** (au, uk, ca, nz, and an `international`/global record) and is referenced by `page` and `article` via a relation. Region carries its own configuration (hreflang code, contact details, JobAdder defaults, navigation, footer, geo settings).

2. **i18n locale is reserved for genuine language translation.** Default locale `en`; additional languages (e.g. `fr` for Canada) enabled per region only where a real translation is wanted. Almost all content is single-locale today. The `market` enum is removed from content types.

3. **Pages form a real tree.** A `page` has an optional `parent` self-relation and a single-segment `slug` (`uid`, unique within region + locale). Full URL paths, breadcrumbs, and default navigation derive from the tree — replacing free-text full-path slugs and the market-prefix hack.

4. **The dynamic-zone block library mirrors the promoted Astro component library 1:1** (BlobHero, PersonaCardGrid, StatsBand, StepsRow, ValueTabs, TestimonialGrid, LogoMarquee, CtaBand, RegionGrid, FormEmbed, RichText, plus a `shared-section` reference block). Editors assemble pages from the same components used in production.

5. **Navigation is relation-based and lives on the region.** Header/footer nav items reference a `page` (rename-safe) or carry an explicit external URL; localizable where a region has translations.

6. **Settings split:** a global single type holds brand-wide values (org, social, default OG, affiliate brands, Organization JSON-LD); per-region config lives on the `region` entity. This removes the en-AU hardcoding.

7. **Operational layer is in scope now:** Strapi Draft preview wired to an Astro preview deploy; a publish webhook that triggers the site rebuild; a production media provider; field help-text and configured list views; per-region editor scoping (see Negative consequences).

The concrete schema, field-by-field, lives in [`docs/ia/strapi-schema-v2.md`](../ia/strapi-schema-v2.md).

## Consequences

### Positive

- Region carries its own config; adding a region (e.g. Ireland) is data entry, not a schema migration + deploy.
- The language axis is free for real translation when needed (French Canada, te reo).
- hreflang/canonical reflect genuine equivalents, not assumed 1:1 region mirrors.
- Slug uniqueness is naturally scoped by region + locale; the prefix hack and `to/fromStrapiSlug` disappear.
- Editors compose pages from the real component library; reusable shared sections cut repetition across five sites.
- Editor model ("I run the UK site") matches the data model.

### Negative

- **Per-region editor scoping is not free in Strapi Community.** Role-based permissions exist, but row-level "this editor may only edit UK content" needs either a custom route policy/middleware keyed to an editor→region mapping, or Strapi Growth/Enterprise (which also brings Review Workflows and Content History). Decision deferred to implementation; a custom policy is the no-cost path for now.
- One-time rework of the Astro Strapi query layer, `types.ts`, `BlockRenderer`, and the seed. Cheap now, not later.
- Cross-region "view this on the AU site" is now an explicit equivalence relation, not a free byproduct of i18n.

### Neutral

- `pageType` is retained as a semantic enum (drives JSON-LD/SEO/breadcrumb logic), explicitly *not* a layout template — layout comes from blocks.
- Strapi i18n plugin stays enabled, but for language only.

## References

- [`docs/ia/strapi-schema-v2.md`](../ia/strapi-schema-v2.md) — concrete target schema
- [ADR 004: Default region Australia](004-default-region-australia.md)
- [ADR 007: As-is IA markets](007-as-is-ia-markets.md)
- [ADR 008: Strapi URL and navigation model](008-strapi-url-nav-model.md) (partly superseded)
