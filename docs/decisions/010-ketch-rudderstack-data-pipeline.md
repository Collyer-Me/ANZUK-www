# ADR 010: Ketch + RudderStack data, consent & tracking pipeline

**Status:** Accepted

**Date:** 2026-06-13

**Supersedes:** GTM-first / Cookiebot approach in POC plan (2026-06-13)

## Context

The marketing site POC initially wired Google Tag Manager as the primary tracking layer with Cookiebot/OneTrust for consent. Stakeholders have chosen a modern, consent-first, event-driven architecture:

- **Ketch** — consent management, regional compliance, policy enforcement
- **RudderStack** — event collection, routing, transformation, destination delivery

GTM may remain optionally for marketing-controlled third-party widgets, but is **not** the primary tracking layer.

## Decision

1. **Consent-first.** Ketch loads before any analytics SDK. No RudderStack events fire until Ketch consent state permits the relevant purpose (analytics, marketing, etc.).

2. **Event-driven tracking.** All user interactions are captured as structured RudderStack events (e.g. `Page Viewed`, `Form Viewed`, `Application Started`). Destinations (GA4, Meta CAPI, Google Ads, JobAdder, Relief Roster) are configured in RudderStack — not as embedded pixel scripts in Astro.

3. **Single event → multiple destinations.** One `Application Submitted` event routes to GA4, Meta, Google Ads, JobAdder, and Relief Roster per RudderStack destination rules and consent filters.

4. **CMS configuration.** Global Settings in Strapi stores Ketch org/property codes and RudderStack write key + data plane URL. Optional `gtmContainerId` for non-tracking marketing scripts only.

5. **POC scope.** Implement Ketch boot + consent bridge + RudderStack JS SDK wrapper + typed event catalog in Astro. Full destination wiring (JobAdder API, RR, Meta CAPI) is configured in RudderStack Cloud — documented as next steps.

## Consequences

### Positive

- Global compliance handled by Ketch (GDPR, CPRA, AU Privacy Act)
- Cleaner frontend — no pixel sprawl
- Consent-aware routing in one place (RudderStack)
- Extensible for Azure/Fabric data platform and AI use cases

### Negative

- Requires Ketch and RudderStack vendor accounts and destination setup
- Team must learn event schema discipline (vs. ad-hoc GTM tags)
- RudderStack server-side destinations (Meta CAPI) need additional infra config

### Neutral

- JotForm remains form submission backend; events fire on `Form Viewed` / future `Form Submitted` postMessage
- Marketing identity layer (UTM capture, prefill) unchanged — enriches event context

## References

- [`docs/architecture/data-consent-tracking.md`](../architecture/data-consent-tracking.md)
- [`docs/ia/external-integrations.md`](../ia/external-integrations.md)
