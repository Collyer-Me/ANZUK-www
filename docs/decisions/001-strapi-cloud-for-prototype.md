# ADR 001: Strapi Cloud for prototype CMS

**Status:** Accepted

**Date:** 2026-06-11

## Context

The marketing hub needs a headless CMS for regional content. The original architecture document proposed self-hosted Strapi on Azure App Service. For the prototype phase, the team lacks Azure access and needs fast editor onboarding.

## Decision

Use **Strapi Cloud** as the hosted CMS for the prototype. Maintain a local `apps/cms/` instance for schema development and offline work. Astro builds fetch content from Strapi Cloud at build time via REST API with a read-only token.

Local schema changes are replicated to Strapi Cloud manually (or via `strapi transfer` when available).

## Consequences

### Positive

- No server or database management for the prototype
- Editors can access the admin UI immediately via a shared URL
- Same API contract as self-hosted Strapi — migration to Azure later only changes `STRAPI_URL`
- `@strapi/plugin-cloud` is already installed in `apps/cms`

### Negative

- Subscription cost for Strapi Cloud
- Schema sync between local and cloud requires discipline
- Some enterprise compliance features (VNet, private endpoints) unavailable until Azure migration

### Neutral

- Local dev can still use SQLite in `apps/cms` for schema work

## References

- [Strapi Cloud setup guide](../guides/strapi-cloud-setup.md)
- [Azure migration (future)](../future/azure-swa-migration.md)
