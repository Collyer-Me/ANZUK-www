# Page types

Canonical enumeration used across all markets. Regions use different subsets — a page type existing in the enum does not mean every market has that page.

## Enum

| Page type | Typical use | Strapi representation |
|-----------|-------------|----------------------|
| `home-international` | Root hub `/` | `localized-page` (`market: international`) |
| `home-regional` | `/{market}/` | `localized-page` |
| `service-educators` | Teach with us, casual hub, international teaching | `localized-page` |
| `service-schools` | Partner / recruit / school enquiry pages | `localized-page` |
| `service-leadership` | Executive search, leadership | `localized-page` |
| `sector` | ECE, primary, OSHC, SEN, support | `localized-page` |
| `job-listing` | Browse jobs / featured jobs archive | `localized-page` + `jobBoardConfig` |
| `job-detail` | Individual job | **Not in Strapi** — JobAdder |
| `blog-listing` | `/{market}/blog/` | `localized-page` |
| `blog-article` | `/{market}/blog/{slug}/` | `article` collection |
| `about` | Who we are | `localized-page` |
| `team-listing` | Meet the team | `localized-page` |
| `contact` | Contact us | `localized-page` |
| `faq` | FAQs | `localized-page` |
| `form-landing` | Register, refer, enquire | `localized-page` |
| `policy` | Privacy and legal | `localized-page` |
| `product` | Ready2Book, Ready2Work, Growth Hub | `localized-page` |
| `process` | Multi-step onboarding (e.g. four-step) | `localized-page` |
| `cross-market` | Teach in AU/UK/NZ from another region | `localized-page` |
| `generic` | Fallback / acquired brand pages | `localized-page` |

## Usage by market

| Page type | Intl | AU | UK | CA | NZ |
|-----------|:----:|:--:|:--:|:--:|:--:|
| `home-international` | ✓ | | | | |
| `home-regional` | | ✓ | ✓ | ✓ | ✓ |
| `service-educators` | ✓ | ✓ | ✓ | | ✓ |
| `service-schools` | ✓ | ✓ | ✓ | | ✓ |
| `service-leadership` | ✓ | ✓ | | | ✓ |
| `sector` | | ✓ | ✓ | | ✓ |
| `job-listing` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `job-detail` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `blog-listing` | | ✓ | ✓ | ✓ | ✓ |
| `blog-article` | | ✓ | ✓ | ✓ | ✓ |
| `about` | | ✓ | ✓ | ✓ | ✓ |
| `team-listing` | | ✓ | ✓ | ✓ | ✓ |
| `contact` | | ✓ | ✓ | ✓ | ✓ |
| `faq` | | ✓ | ✓ | ✓ | ✓ |
| `form-landing` | | ✓ | ✓ | ✓ | ✓ |
| `policy` | | ✓ | ✓ | ✓ | ✓ |
| `product` | | ✓ | ✓ | ✓ | ✓ |
| `process` | | | | | ✓ |
| `cross-market` | | ✓ | ✓ | ✓ | ✓ |
| `generic` | | ✓ | ✓ | | | |

## Future block components (not in prototype)

Production sections that will need Strapi blocks later:

| Block | Seen on |
|-------|---------|
| `blocks.region-grid` | International home |
| `blocks.values-grid` | International home, who-we-are |
| `blocks.logo-carousel` | International home |
| `blocks.video-accordion` | International home, service pages |
| `blocks.form-embed` | Register, partner, refer pages |
| `blocks.featured-jobs` | Home, job-listing pages |
| `blocks.testimonials` | Regional homes |

Prototype uses existing blocks (`hero`, `feature-grid`, `cta`, `testimonial`) as placeholders.
