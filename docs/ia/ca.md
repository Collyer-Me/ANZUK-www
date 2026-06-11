# Canada (`/ca/`)

Market: `ca`  
WordPress theme: `anzuk-education`

Leanest regional site — ~12 top-level pages. Focus on cross-market teaching opportunities.

## Top-level navigation

| Path | Title | Page type | Strapi |
|------|-------|-----------|--------|
| `/ca/` | Home - ANZUK Education | `home-regional` | `localized-page` |
| `/ca/who-we-are/` | Who we are | `about` | `localized-page` |
| `/ca/who-we-are/meet-the-team/` | Meet the Team | `team-listing` | `localized-page` |
| `/ca/blog/` | Blog | `blog-listing` | `localized-page` |
| `/ca/blog/{slug}/` | (article) | `blog-article` | `article` |
| `/ca/browse-jobs/` | Browse Jobs | `job-listing` | `localized-page` |
| `/ca/browse-jobs/{slug}/` | (job) | `job-detail` | JobAdder |
| `/ca/register-to-teach/` | Register to Teach | `form-landing` | `localized-page` |
| `/ca/contact-us/` | Contact Us | `contact` | `localized-page` |
| `/ca/faqs/` | FAQs | `faq` | `localized-page` |
| `/ca/policy/` | Policies | `policy` | `localized-page` |
| `/ca/policy/privacy-policy/` | Privacy policy | `policy` | `localized-page` |
| `/ca/ready2work/` | Ready2Work | `product` | `localized-page` |
| `/ca/teach-in-australia/` | Teach in Australia | `cross-market` | `localized-page` |
| `/ca/teach-in-new-zealand/` | Teach in New Zealand | `cross-market` | `localized-page` |
| `/ca/teach-in-the-uk/` | Teach in the UK | `cross-market` | `localized-page` |

## Not present in Canada (vs AU/NZ)

- No `casual-opportunities` / `permanent-contract` split
- No sector landing pages (ECE, primary, OSHC, etc.)
- No `ready2book` (only Ready2Work)
- No `executive` page
- No `refer-earn` / `refer-a-friend`

## Notes

- Events at `/ca/events/` exist (e.g. summer socials in Calgary, Toronto, Vancouver) but are **out of prototype scope**
- Blog topics focus on moving to Australia/UK from Canada
