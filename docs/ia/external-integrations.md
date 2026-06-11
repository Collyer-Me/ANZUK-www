# External integrations

Systems that provide content or functionality **outside** Strapi. The CMS stores configuration and page shells only.

## JobAdder (jobs)

**Role:** Source of truth for all job listings.

| URL pattern | Market |
|-------------|--------|
| `/browse-jobs/{slug}/` | International |
| `/{market}/browse-jobs/{slug}/` | AU, CA, NZ |
| `/uk/featured-jobs/{slug}/` | UK |

**Apply URLs:** `https://apply.jobadder.com/{accountId}/{jobId}/...`

**Strapi approach:**

- `localized-page` with `pageTemplate: job-listing` provides the archive shell
- Optional `jobBoardConfig` component: `jobAdderBoardId`, `featuredOnly`, `externalApply`
- No `job` collection in Strapi
- Frontend fetches jobs at build time via `apps/web/src/lib/jobadder/` (stub in prototype)

## JotForm (forms)

**Role:** Registration, school enquiries, referrals, some job applications.

| Form purpose | Example ID |
|--------------|------------|
| Educator expression of interest | `251698770470871` |
| School enquiries | `251698159691877` |
| Job application (with JobAdder ID) | `251699142417866` |

**Strapi approach:**

- Store JotForm IDs in page content or a future `form-embed` block
- Form submissions stay in JotForm — not synced to Strapi

## Scoot Education (United States)

**URL:** [scoot.education](https://scoot.education/)

**Role:** US market brand on a separate domain. Linked from international homepage country grid (USA tile).

**Strapi approach:**

- `site-setting.scootUrl` — external link only
- No `/us/` subsite on anzuk.education in production
- Prototype region picker links to Scoot instead of hosting US pages

## ANZUK Executive

**URL:** [anzukexecutive.com](https://www.anzukexecutive.com/)

**Role:** Executive search brand. Linked from AU/NZ executive pages and international footer.

**Strapi approach:**

- `site-setting.executiveUrl` — external link in `affiliateBrands` or site settings

## Ready2Book / Ready2Work

**Role:** SaaS products for schools and educators.

**Strapi approach:**

- Marketing pages as `localized-page` with `pageTemplate: product`
- Product apps themselves are external

## Growth Hub (Australia)

**URL:** `/au/growth-hub/`

**Role:** Professional development courses for educators.

**Strapi approach:**

- Marketing page in CMS; course catalogue likely external LMS

## WordPress legacy (migration reference)

| WP type | Count | Prototype handling |
|---------|-------|-------------------|
| `post` (root blog) | ~118 | Ignored — legacy NZ posts |
| Regional blog | Per market | `article` collection |
| `staff-member` CPT | ~144 | Deferred — team pages use `team-listing` template only |
| Events (WP pages) | Per market | Deferred |
| Pages | Many | `localized-page` per market |

## Analytics and geo-routing

| System | Role | Strapi |
|--------|------|--------|
| Google Tag Manager | Analytics | Not in CMS |
| Geo-redirect banner | Suggest local site | `site-setting.geoSuggestEnabled` |
