# International hub (`/`)

Market: `international`  
WordPress theme: `anzuk-home`

## Page inventory

| Path | Title | Page type | Strapi | Notes |
|------|-------|-----------|--------|-------|
| `/` | Home - ANZUK Education | `home-international` | `localized-page` | Geo-redirect banner; country grid; BE GREAT values; school logos |
| `/international-teaching-jobs/` | International teaching jobs | `service-educators` | `localized-page` | Sections: international experience, teach abroad events, employment opportunities, featured jobs, salary & benefits |
| `/browse-jobs/` | Search international teaching jobs | `job-listing` | `localized-page` | JobAdder feed; Hong Kong, UAE, Oman, China roles |
| `/teacher-recruitment-for-school/` | Teacher recruitment for school | `service-schools` | `localized-page` | 20+ years; DEI; team; committed teachers |
| `/school-leadership-search/` | School leadership search | `service-leadership` | `localized-page` | Search methodology; team; newsroom |

## Navigation (primary)

| Label | Path |
|-------|------|
| About international teaching | `/international-teaching-jobs/` |
| Search international teaching jobs | `/browse-jobs/` |
| Teacher recruitment for schools | `/teacher-recruitment-for-school/` |
| School leadership search | `/school-leadership-search/` |

## Affiliate brands (footer / hub)

| Brand | URL | In Strapi |
|-------|-----|-----------|
| Scoot Education | `https://scoot.education/` | `site-setting.scootUrl` |
| ANZUK Education | `https://anzuk.education/` | — |
| ANZUK Executive | `https://www.anzukexecutive.com/` | `site-setting.executiveUrl` |

## Regional links (country grid)

| Region | URL |
|--------|-----|
| Australia | `/au/` |
| United Kingdom | `/uk/` |
| Canada | `/ca/` |
| USA | `https://scoot.education/` (external) |
| New Zealand | `/nz/` |

## Forms (JotForm — not Strapi content)

| CTA | Form URL |
|-----|----------|
| Expression of interest (educators) | `https://form.jotform.com/251698770470871` |
| School enquiries | `https://form.jotform.com/251698159691877` |

## Strapi slug mapping

| Production path | Strapi `market` | Strapi `slug` |
|-----------------|-----------------|---------------|
| `/` | `international` | `home` |
| `/international-teaching-jobs/` | `international` | `international-teaching-jobs` |
| `/browse-jobs/` | `international` | `browse-jobs` |
| `/teacher-recruitment-for-school/` | `international` | `teacher-recruitment-for-school` |
| `/school-leadership-search/` | `international` | `school-leadership-search` |
