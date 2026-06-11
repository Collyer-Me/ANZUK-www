# United Kingdom (`/uk/`)

Market: `uk`  
WordPress theme: `anzuk-education`

Distinct page set — uses `featured-jobs` instead of `browse-jobs` as primary job entry in some contexts.

## Top-level navigation

| Path | Title | Page type | Strapi |
|------|-------|-----------|--------|
| `/uk/` | Home - ANZUK Education | `home-regional` | `localized-page` |
| `/uk/who-we-are/` | Who we are | `about` | `localized-page` |
| `/uk/who-we-are/meet-the-team/` | Meet the Team | `team-listing` | `localized-page` |
| `/uk/blog/` | Blog | `blog-listing` | `localized-page` |
| `/uk/blog/{slug}/` | (article) | `blog-article` | `article` |
| `/uk/teach-with-us/` | Teach with us | `service-educators` | `localized-page` |
| `/uk/find-a-job/` | Find a job | `job-listing` | `localized-page` |
| `/uk/featured-jobs/` | Featured jobs | `job-listing` | `localized-page` |
| `/uk/featured-jobs/{slug}/` | (job) | `job-detail` | JobAdder |
| `/uk/register-to-teach/` | Register to Teach | `form-landing` | `localized-page` |
| `/uk/contact-us/` | Contact Us | `contact` | `localized-page` |
| `/uk/faqs/` | FAQs | `faq` | `localized-page` |
| `/uk/policy/` | Policies | `policy` | `localized-page` |
| `/uk/policy/privacy-policy/` | Privacy policy | `policy` | `localized-page` |
| `/uk/ready2book/` | Ready2Book | `product` | `localized-page` |
| `/uk/ready2work/` | Ready2Work | `product` | `localized-page` |
| `/uk/teach-in-new-zealand/` | Teach in New Zealand | `cross-market` | `localized-page` |
| `/uk/travel-with-us/` | Travel with us | `cross-market` | `localized-page` |

## Additional pages (not always in primary nav)

| Path | Title | Page type | Strapi |
|------|-------|-----------|--------|
| `/uk/apple-a-day-supply/` | Apple a Day supply | `generic` | `localized-page` |
| `/uk/become-school-partner/` | Become school partner | `form-landing` | `localized-page` |
| `/uk/partner-with-us/` | Partner with us | `form-landing` | `localized-page` |
| `/uk/care-and-education/` | Care and education | `sector` | `localized-page` |
| `/uk/education-support/` | Education support | `sector` | `localized-page` |
| `/uk/special-education-needs-opportunities/` | SEN opportunities | `sector` | `localized-page` |
| `/uk/safer-schools-with-anzuk/` | Safer schools with ANZUK | `generic` | `localized-page` |
| `/uk/refer-a-friend/` | Refer a friend | `form-landing` | `localized-page` |
| `/uk/sign-up-for-events/` | Sign up for events | `form-landing` | `localized-page` |

## UK-specific notes

- **Featured jobs** (`/uk/featured-jobs/`) is the curated job board — differs from AU/NZ `browse-jobs` pattern
- **Apple a Day** — acquired supply brand; standalone landing page
- **Travel with us** — relocation/onboarding content for international educators
- Events at `/uk/events/` exist but are **out of prototype scope**
