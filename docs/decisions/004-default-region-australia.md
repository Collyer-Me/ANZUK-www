# ADR 004: Default region Australia

**Status:** Accepted

**Date:** 2026-06-11

## Context

The marketing hub serves four English-speaking regions (US, UK, Australia, New Zealand) via subdirectory URLs (`/au/`, `/uk/`, `/us/`, `/nz/`). A default region is needed for Astro i18n config, `x-default` hreflang, and CMS defaults.

## Decision

Set **Australia** as the default region:

- Astro `defaultLocale`: `au`
- Strapi default locale: `en-AU`
- `x-default` hreflang points to the Australian homepage (`/au/`) unless the root region picker is preferred later
- Region order in config: `au`, `uk`, `us`, `nz`

URL segment `au` maps to BCP 47 `en-AU` and Strapi locale `en-AU`.

## Consequences

### Positive

- Aligns with ANZUK's primary market
- Consistent defaults across Astro, Strapi, and SEO tags

### Negative

- US/UK visitors land on region picker or `/au/` as x-default — acceptable for prototype; Cloudflare geo-suggest can refine later

### Neutral

- All four regions remain equal in routing structure (`prefixDefaultLocale: true`)

## References

- `apps/web/src/config/regions.ts`
