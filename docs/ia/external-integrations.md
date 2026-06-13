# External integrations

Systems that provide content or functionality **outside** Strapi. The CMS stores configuration and page shells only.

See also: [`docs/architecture/data-consent-tracking.md`](../architecture/data-consent-tracking.md), [ADR 010](../decisions/010-ketch-rudderstack-data-pipeline.md), and the [marketing setup checklist](../future/marketing-data-setup.md).

## Data, consent & tracking (Ketch + RudderStack)

**Role:** Consent-first, event-driven data pipeline replacing GTM-as-primary-tracking.

| Layer | Tool | Config location |
|-------|------|-----------------|
| Consent | **Ketch** | `global-setting.ketchOrganizationCode`, `ketchPropertyCode` |
| Events | **RudderStack** | `global-setting.rudderStackWriteKey`, `rudderStackDataPlaneUrl` |
| Optional widgets | GTM (reduced) | `global-setting.optionalGtmContainerId` |

**Frontend:**

- `KetchConsent.astro` — Ketch boot + dev fallback banner
- `RudderStackHead.astro` — SDK, consent-gated `Page Viewed` events
- `lib/analytics/events.ts` — canonical event names
- Env: `PUBLIC_KETCH_ORG`, `PUBLIC_KETCH_PROPERTY`, `PUBLIC_RUDDERSTACK_WRITE_KEY`, `PUBLIC_RUDDERSTACK_DATA_PLANE_URL`

**Destinations (RudderStack Cloud — configure in dashboard):**

| Destination | Events | Consent filter |
|-------------|--------|----------------|
| GA4 | Page Viewed, Application Submitted, … | Analytics |
| Meta (web + CAPI) | Application Submitted, … | Marketing |
| Google Ads | Application Submitted, … | Marketing |
| JobAdder | Application Submitted | Per policy |
| Relief Roster | Application Submitted, Booking Confirmed | Per policy |

GTM is **not** used for GA4/Meta pixels. Optional GTM loads marketing widgets only.

## JobAdder (jobs)

**Role:** Source of truth for all job listings.

| URL pattern | Market |
|-------------|--------|
| `/browse-jobs/{slug}/` | International |
| `/{market}/browse-jobs/{slug}/` | AU, CA, NZ |
| `/uk/featured-jobs/{slug}/` | UK |

**Apply URLs:** `https://apply.jobadder.com/{accountId}/{jobId}/...`

**Strapi approach:**

- `page` with `pageType: job-listing` provides the archive shell
- Optional `jobBoardConfig` component on page
- Frontend stub at `apps/web/src/lib/jobadder/` (POC)
- **Tracking:** `Job Viewed`, `Application Started`, `Application Submitted` events via RudderStack → JobAdder destination (next step)

## JotForm (forms)

**Role:** Registration, school enquiries, referrals.

| Form purpose | Example ID |
|--------------|------------|
| Educator expression of interest | `251698770470871` |
| School enquiries | `251698159691877` |
| Job application | `251699142417866` |

**Strapi:** `blocks.form-embed` with `jotformId`, optional `trackingParams`.

**Tracking:** `Form Viewed` RudderStack event + UTM/region prefill via `marketing-identity.ts`. Submissions stay in JotForm.

## Marketing identity (lead capture — no login)

| Capability | Implementation |
|------------|----------------|
| Campaign attribution | UTM → sessionStorage → event properties + JotForm prefill |
| Progressive profiling | JotForm hidden fields (`region`, `landing_page`, `utm_*`) |
| Product handoff | Tracked outbound URLs on external CTAs |
| Future CDP | RudderStack warehouse destination |

## Scoot Education (United States)

**URL:** [scoot.education](https://scoot.education/) — external link via `global-setting.scootUrl`.

## ANZUK Executive

**URL:** [anzukexecutive.com](https://www.anzukexecutive.com/) — `global-setting.executiveUrl`.

## Ready2Book / Ready2Work

Marketing pages in CMS; SaaS apps external. Outbound CTAs append UTM + region via marketing identity layer.

## Geo-suggest banner

`region.geoSuggestEnabled` — deferred; see `docs/future/cloudflare-geo-worker.md`.

## Publish → rebuild webhook

Strapi publish lifecycle → `DEPLOY_WEBHOOK_URL` → GitHub Actions deploy. See `apps/cms/src/index.ts`.

## WordPress legacy (migration reference)

Regional blog → `article`. Pages → `page` with region relation.
