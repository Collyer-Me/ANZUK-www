# New Zealand (`/nz/`)

Market: `nz`  
WordPress theme: `anzuk-education`

## Top-level navigation

| Path | Title | Page type | Strapi |
|------|-------|-----------|--------|
| `/nz/` | ANZUK Education \| Experts in Recruitment for Education Jobs | `home-regional` | `localized-page` |
| `/nz/who-we-are/` | Who we are | `about` | `localized-page` |
| `/nz/who-we-are/meet-the-team/` | Meet the Team | `team-listing` | `localized-page` |
| `/nz/blog/` | Blog | `blog-listing` | `localized-page` |
| `/nz/blog/{slug}/` | (article) | `blog-article` | `article` |
| `/nz/browse-jobs/` | Browse Jobs | `job-listing` | `localized-page` |
| `/nz/browse-jobs/{slug}/` | (job) | `job-detail` | JobAdder |
| `/nz/casual-opportunities/` | Casual opportunities | `service-educators` | `localized-page` |
| `/nz/permanent-contract/` | Permanent & contract | `service-educators` | `localized-page` |
| `/nz/early-childhood-services/` | Early childhood services | `sector` | `localized-page` |
| `/nz/primary-secondary-school/` | Primary & secondary school | `sector` | `localized-page` |
| `/nz/executive/` | Executive | `service-leadership` | `localized-page` |
| `/nz/four-step-process/` | Four Agency Process | `process` | `localized-page` |
| `/nz/international-educator-support/` | International educator support | `service-educators` | `localized-page` |
| `/nz/recruiting-international-staff/` | Recruiting international staff | `service-schools` | `localized-page` |
| `/nz/partner-with-us/` | Partner with ANZUK Education | `form-landing` | `localized-page` |
| `/nz/refer-earn/` | Refer & Earn | `form-landing` | `localized-page` |
| `/nz/register-to-teach/` | Register to Teach | `form-landing` | `localized-page` |
| `/nz/contact-us/` | Contact Us | `contact` | `localized-page` |
| `/nz/faqs/` | FAQs | `faq` | `localized-page` |
| `/nz/policy/` | Policies | `policy` | `localized-page` |
| `/nz/ready2book/` | Ready2Book | `product` | `localized-page` |
| `/nz/ready2work/` | Ready2Work | `product` | `localized-page` |
| `/nz/teach-in-australia/` | Teach in Australia | `cross-market` | `localized-page` |
| `/nz/teach-in-the-uk/` | Teach in the UK | `cross-market` | `localized-page` |

## NZ-specific pages

| Path | Page type | Notes |
|------|-----------|-------|
| `/nz/four-step-process/` | `process` | Overseas teacher onboarding (qualifications, registration, right to work) |
| `/nz/international-educator-support/` | `service-educators` | Support for overseas-trained teachers |
| `/nz/recruiting-international-staff/` | `service-schools` | Schools hiring international staff |
| `/nz/refer-earn/` | `form-landing` | Educator referral programme |

## Legacy blog (out of scope)

~118 WordPress posts exist at **root level** (`/slug/`) without `/nz/blog/` prefix. These are legacy NZ content. The prototype uses only regional blogs at `/nz/blog/{slug}/`.

Example duplicate URLs for the same article:

- Legacy: `/5-reasons-teach-nz/`
- Regional: `/nz/blog/5-reasons-teach-nz/`

## Notes

- Events at `/nz/events/` exist but are **out of prototype scope**
- Team members exist as WordPress `staff-member` CPT (~144 globally) — not in prototype Strapi yet
