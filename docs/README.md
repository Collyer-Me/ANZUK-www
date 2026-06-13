# ANZUK Global Marketing Hub — Documentation

Central index for architecture decisions, setup guides, and production migration notes.

## Architecture

- [Original vision](../project_architecture.md) — high-level roadmap (Azure/Cloudflare target state)
- [Data, consent & tracking](architecture/data-consent-tracking.md) — Ketch + RudderStack pipeline (POC)
- [Project rules](../project-rules.md) — coding standards for the team

## Architecture Decision Records (ADRs)

| ADR | Title | Status |
|-----|-------|--------|
| [000](decisions/000-adr-template.md) | ADR template | Accepted |
| [001](decisions/001-strapi-cloud-for-prototype.md) | Strapi Cloud for prototype CMS | Accepted |
| [002](decisions/002-github-pages-hosting.md) | GitHub Pages for prototype hosting | Accepted |
| [003](decisions/003-defer-cloudflare-azure.md) | Defer Cloudflare and Azure | Accepted |
| [004](decisions/004-default-region-australia.md) | Default region Australia | Accepted |
| [005](decisions/005-github-pages-url-tbd.md) | GitHub Pages URL TBD | Accepted |
| [006](decisions/006-monorepo-apps-layout.md) | Monorepo apps layout | Accepted |
| [007](decisions/007-as-is-ia-markets.md) | As-is IA markets and CMS boundaries | Accepted |
| [010](decisions/010-ketch-rudderstack-data-pipeline.md) | Ketch + RudderStack data pipeline | Accepted |

## Information architecture (as-is)

- [IA index](ia/README.md) — production page inventories per market, page types, Strapi mapping

## Guides

- [Local development](guides/local-development.md)
- [Strapi Cloud setup](guides/strapi-cloud-setup.md)
- [Seed Strapi content](guides/seed-strapi.md)
- [GitHub Pages deploy](guides/github-pages-deploy.md)
- [POC demo script](guides/poc-demo-script.md)

## Future production

- [Marketing data platform setup](future/marketing-data-setup.md) — Ketch + RudderStack checklist (POC → production)
- [Azure SWA migration](future/azure-swa-migration.md)
- [Cloudflare geo worker](future/cloudflare-geo-worker.md)

## Adding a new ADR

1. Copy [000-adr-template.md](decisions/000-adr-template.md) to `decisions/NNN-short-title.md`
2. Fill in Context, Decision, Consequences
3. Add a row to the table above
4. Reference the ADR in related code or Cursor rules when relevant
