# Strapi prototype content specification

Default Priority 1 inputs for the greenfield Strapi architecture. Derived from [`docs/ia/`](../ia/) production inventory; used until marketing provides overrides.

## Editor workflow (default)

| Setting | Decision |
|---------|----------|
| Approval | Single editor can publish directly (prototype phase) |
| Market ownership | Each regional team edits their market independently |
| Cross-market visibility | All editors can view all markets; restrict by Strapi role in production |
| Draft workflow | Draft & Publish enabled on pages and articles |

Recommended Strapi roles (configure in admin): **Super Admin**, **AU Editor**, **UK Editor**, **CA Editor**, **NZ Editor**, **International Editor**.

## Prototype page shortlist

| Market | Slug | Page type | Content |
|--------|------|-----------|---------|
| international | `home` | home-international | Placeholder + new blocks |
| international | `browse-jobs` | job-listing | Placeholder |
| international | `teacher-recruitment-for-school` | service-schools | Placeholder |
| au | `home` | home-regional | Placeholder + stats |
| au | `who-we-are` | about | Rich text |
| au | `who-we-are/meet-the-team` | team-listing | Placeholder (nested URL) |
| au | `browse-jobs` | job-listing | Placeholder |
| au | `casual-opportunities` | service-educators | Placeholder |
| uk | `home` | home-regional | Placeholder |
| uk | `teach-with-us` | service-educators | Placeholder |
| ca | `home` | home-regional | Placeholder |
| ca | `teach-in-australia` | cross-market | Placeholder |
| nz | `home` | home-regional | Placeholder |
| nz | `four-step-process` | process | Rich text |
| nz | `refer-earn` | form-landing | JotForm embed |
| nz | `partner-with-us` | form-landing | JotForm embed |

Blog articles: 2 per region (existing mock data).

## Homepage section inventory

### International (`/`)

1. Hero (3 CTAs — prototype uses single CTA)
2. Region grid (`blocks.region-grid`)
3. Educators vs Schools split CTA (`blocks.cta`)
4. Values grid (`blocks.values-grid`)
5. Logo carousel — deferred (use feature-grid placeholder if needed)

### Regional homes (`/au/`, `/uk/`, etc.)

1. Hero
2. Stats row (`blocks.stats-row`)
3. Feature grid (Why ANZUK)
4. CTA (Get started)

## Navigation trees (managed in Site Settings)

### International

- About international teaching → `international-teaching-jobs`
- Search jobs → `browse-jobs`
- Teacher recruitment → `teacher-recruitment-for-school`
- Leadership search → `school-leadership-search`

### Australia

- Who we are → `who-we-are` (Meet the team → `who-we-are/meet-the-team`)
- For educators → `casual-opportunities` (Browse jobs → `browse-jobs`)
- Browse jobs → `browse-jobs`
- Contact → `contact-us`

### United Kingdom

- Who we are → `who-we-are`
- Teach with us → `teach-with-us`
- Featured jobs → `featured-jobs`
- Blog → `blog`

### Canada

- Who we are → `who-we-are`
- Teach in Australia → `teach-in-australia`
- Browse jobs → `browse-jobs`
- Blog → `blog`

### New Zealand

- Who we are → `who-we-are`
- Four-step process → `four-step-process`
- Browse jobs → `browse-jobs`
- Partner with us → `partner-with-us`
- Refer & earn → `refer-earn`

## JotForm IDs (form-landing pages)

| Page | Form ID |
|------|---------|
| NZ Refer & Earn | `251698770470871` |
| NZ Partner with us | `251698159691877` |
| School enquiries (intl) | `251698159691877` |

See [`docs/ia/external-integrations.md`](../ia/external-integrations.md).
