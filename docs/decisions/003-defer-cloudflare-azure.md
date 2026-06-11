# ADR 003: Defer Cloudflare and Azure

**Status:** Accepted

**Date:** 2026-06-11

## Context

The original architecture targets Azure Static Web Apps, Azure App Service (Strapi), and Cloudflare (CDN, WAF, geo-suggest Worker). The prototype team does not have access to these services initially.

## Decision

**Defer** all Azure and Cloudflare infrastructure to a future production phase. Document migration paths in `docs/future/` but do not provision or configure these services in the prototype.

Geo-routing UX is handled by an in-browser **region picker** on `/` (suggest, don't force). No edge redirects.

## Consequences

### Positive

- Prototype can ship without enterprise cloud onboarding
- Frontend and CMS code remain cloud-agnostic
- Migration docs prepared before they're needed

### Negative

- No CDN edge caching or WAF in prototype
- No `cf-ipcountry` geo-suggest banner until Cloudflare is added
- Production performance and security differ from prototype

### Neutral

- SEO (hreflang, canonical, JSON-LD) works without Cloudflare

## References

- [Cloudflare geo worker (future)](../future/cloudflare-geo-worker.md)
- [Azure SWA migration (future)](../future/azure-swa-migration.md)
