# As-is Information Architecture

Descriptive inventory of [anzuk.education](https://anzuk.education/) as it exists today. This documents current production structure to inform the Strapi prototype — **not** the target future IA.

## Contents

| Document | Description |
|----------|-------------|
| [00-site-map.md](00-site-map.md) | Top-level architecture and market overview |
| [international.md](international.md) | International hub pages (`/`) |
| [au.md](au.md) | Australia regional site |
| [uk.md](uk.md) | United Kingdom regional site |
| [ca.md](ca.md) | Canada regional site |
| [nz.md](nz.md) | New Zealand regional site |
| [page-types.md](page-types.md) | Canonical page type enum |
| [external-integrations.md](external-integrations.md) | Systems outside Strapi |
| [strapi-mapping.md](strapi-mapping.md) | Content type → market matrix |

## Methodology

- HTML crawl of live pages (June 2026) via `curl` with browser user-agent
- WordPress REST API (`/wp-json/wp/v2/`) for post types, categories, and staff-member counts
- Navigation extraction from regional homepages
- Child page discovery via internal link analysis

## Scope

### In scope

- International hub and regional marketing page trees (`au`, `uk`, `ca`, `nz`)
- Page type labelling for Strapi prototype
- Regional blogs at `/{market}/blog/`

### Out of scope (for now)

- Future IA redesign
- Events (`/{region}/events/`)
- Legacy root-level NZ blog posts (`/slug/` — ~118 WordPress posts at site root)
- Job content in Strapi (sourced from JobAdder)
- Scoot Education site content (`scoot.education` — separate US domain)

## Production vs prototype

| Production | Prototype notes |
|------------|-----------------|
| International hub at `/` | Modelled as `market: international` |
| Canada at `/ca/` | Added to prototype config |
| US via Scoot (`scoot.education`) | External link in site settings, not a subsite |
| Two WordPress themes | `anzuk-home` (international), `anzuk-education` (regional) |

See [ADR 007](../decisions/007-as-is-ia-markets.md) for decisions.
