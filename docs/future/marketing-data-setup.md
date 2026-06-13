# Marketing data platform — setup checklist

**Status:** POC in progress — Ketch smart tag wired; RudderStack next.

Operational checklist for standing up **Ketch** (consent) and **RudderStack** (events & routing). Code lives in the Astro app; vendor configuration happens in each platform's dashboard.

See also: [Data, consent & tracking architecture](../architecture/data-consent-tracking.md) · [ADR 010](../decisions/010-ketch-rudderstack-data-pipeline.md) · [POC demo script](../guides/poc-demo-script.md)

---

## Ketch (consent)

### Done (POC)

- [x] Ketch account created (free tier)
- [x] Smart tag property: org **`anzuk`**, property **`website_smart_tag`**
- [x] Boot URL: `https://global.ketchcdn.com/web/v3/config/anzuk/website_smart_tag/boot.js`
- [x] Astro loads smart tag via `KetchConsent.astro` (official `semaphore` bootstrap)
- [x] Consent bridge fires `anzuk:consent-updated` for RudderStack gating
- [x] Env vars documented: `PUBLIC_KETCH_ORG`, `PUBLIC_KETCH_PROPERTY` (see `apps/web/.env.example`)

### To do (Ketch dashboard & config)

- [ ] **Define purposes** in Ketch (e.g. Essential, Functional, Analytics, Marketing/Advertising)
- [ ] **Record purpose codes** — note the exact keys Ketch emits (e.g. `analytics`, `advertising`) and update `mapKetchPurposes()` in `apps/web/src/lib/analytics/consent.ts` if they differ from defaults
- [ ] **Design consent experience** — banner copy, preference centre, logo, colours aligned with ANZUK brand
- [ ] **Regional experiences** — separate or geo-targeted banners for AU, UK, CA, NZ (and US if needed)
- [ ] **Link privacy / cookie policy** — ensure each region's policy URL is set in Strapi `region.cookiePolicyUrl` so the banner can reference it
- [ ] **Strapi Global Settings** — set `ketchEnabled`, `ketchOrganizationCode`, `ketchPropertyCode` so production builds do not depend on env vars alone
- [ ] **Google Consent Mode** (if using Google tags via RudderStack) — enable in Ketch and map purposes to Consent Mode signals
- [ ] **QA on localhost** — confirm banner appears, preferences persist, `sessionStorage.anzuk_consent_state` updates after choices
- [ ] **QA on deployed site** — repeat on GitHub Pages URL; check Network tab for `boot.js` 200
- [ ] **Document purpose → destination mapping** — table of which Ketch purposes unlock which RudderStack destinations (for marketing/compliance sign-off)
- [ ] **Plan tier upgrade** — free tier is POC-only; confirm licensing before production launch

---

## RudderStack (events & routing)

### Done (POC)

- [x] Architecture decided (ADR 010) — RudderStack replaces GTM as primary tracking layer
- [x] Astro SDK wrapper: `RudderStackHead.astro`, `lib/analytics/rudderstack.ts`, `lib/analytics/events.ts`
- [x] Consent-gated page events (`Page Viewed`, `Form Viewed`) once Ketch permits analytics
- [x] Env var placeholders: `PUBLIC_RUDDERSTACK_WRITE_KEY`, `PUBLIC_RUDDERSTACK_DATA_PLANE_URL`

### To do (RudderStack dashboard & config)

- [x] **Create RudderStack account** (free / POC tier)
- [x] **Add JavaScript source** for the ANZUK marketing site
- [x] **Copy write key + data plane URL** into `apps/web/.env`
- [ ] **Verify Live Events** — run local dev, accept Ketch analytics consent, confirm `Page Viewed` in RudderStack Live Events
- [ ] **Configure consent filters** on each destination using Ketch purpose codes (block marketing destinations when advertising denied, etc.)
- [ ] **Destinations — phase 1 (POC demo):**
  - [ ] Google Analytics 4
  - [ ] Meta (web + server-side CAPI when ready)
  - [ ] Google Ads conversions
- [ ] **Destinations — phase 2 (internal):**
  - [ ] JobAdder webhook on `Application Submitted`
  - [ ] Relief Roster on placement / booking events
- [ ] **Event catalog sign-off** — align marketing on canonical names in `lib/analytics/events.ts` (`Job Viewed`, `Application Submitted`, etc.)
- [ ] **Implement remaining frontend events** — `Form Submitted` (JotForm postMessage), job/application events when JobAdder is wired
- [ ] **Event QA checklist** — run through [POC demo script](../guides/poc-demo-script.md) with Live Events + destination debuggers open
- [ ] **Remove legacy tracking** — retire any GTM/GA/Meta pixel tags from old site; GTM optional for widgets only (`optionalGtmContainerId`)

---

## Cross-cutting (after Ketch + RudderStack basics work)

- [ ] End-to-end test: Ketch deny marketing → confirm Meta/Google Ads destinations receive nothing; allow analytics → GA4 receives `Page Viewed`
- [ ] GitHub Actions secrets for production (`PUBLIC_RUDDERSTACK_*`, optionally `PUBLIC_KETCH_*` if not in Strapi)
- [ ] Stakeholder demo using [POC demo script](../guides/poc-demo-script.md)
- [ ] Future: Azure / Fabric warehouse destination for historical events and AI use cases

---

## Quick reference — env vars

| Variable | Purpose |
|----------|---------|
| `PUBLIC_KETCH_ORG` | Ketch organization code (`anzuk`) |
| `PUBLIC_KETCH_PROPERTY` | Ketch property code (`website_smart_tag`) |
| `PUBLIC_RUDDERSTACK_WRITE_KEY` | RudderStack JavaScript source write key |
| `PUBLIC_RUDDERSTACK_DATA_PLANE_URL` | RudderStack data plane URL |
| `PUBLIC_GTM_ID` | Optional — marketing widgets only, not primary tracking |
