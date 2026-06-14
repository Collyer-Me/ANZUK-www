# Strapi editor guide

Guide for marketing editors managing content in Strapi Cloud. See also [`strapi-prototype-spec.md`](strapi-prototype-spec.md) and [`strapi-cloud-setup.md`](strapi-cloud-setup.md).

## Getting started

1. Sign in to your Strapi Cloud admin URL (provided by your team lead).
2. Use **Content Manager** for day-to-day editing — not Content-Type Builder (developers only).
3. Changes appear on the live site after the next site build (typically triggered manually or via webhook).

## Content types you will use

| Type | What it is | Example |
|------|------------|---------|
| **Localized Page** | A marketing page on the website | AU Who we are |
| **Article** | A blog post | `/au/blog/anzuk-values/` |
| **Site Settings** | Global config and navigation | Main nav menus |

## Creating a page

1. Go to **Content Manager → Localized Page → Create new entry**.
2. Fill in:
   - **Title** — page heading (also used for default SEO title).
   - **Slug** — URL path without market prefix. Use lowercase and hyphens. For nested pages use slashes: `who-we-are/meet-the-team`.
   - **Market** — which site this page belongs to (`au`, `uk`, `ca`, `nz`, or `international`).
   - **Page template** — page category (home, about, job listing, etc.). Ask your lead if unsure.
3. Add **Page sections** (the body dynamic zone) — pick blocks in order top-to-bottom.
4. Fill in **SEO** — meta title and description.
5. Click **Save**, then **Publish**.

### Slug rules

| Market | Slug example | Live URL |
|--------|--------------|----------|
| International | `browse-jobs` | `/browse-jobs/` |
| Australia | `who-we-are` | `/au/who-we-are/` |
| Australia (nested) | `who-we-are/meet-the-team` | `/au/who-we-are/meet-the-team/` |

Do not include the market prefix (`au/`) in the slug — Strapi adds that automatically on the website.

## Page sections (blocks)

| Block | Use for |
|-------|---------|
| **Hero** | Top banner with headline and primary CTA |
| **Region Grid** | Country/market tiles (international home) |
| **Values Grid** | BE GREAT values section |
| **Feature Grid** | Icon cards (Why ANZUK, services) |
| **Stats Row** | Headline numbers on regional home pages |
| **CTA** | Call-to-action band with button |
| **Rich Text** | About pages, policies, process steps |
| **Lead Form** | Native expression-of-interest form (submissions in Strapi) |
| **Form Embed** | Legacy JotForm iframe (being phased out) |
| **Testimonial** | Quote with author name |

Recommended block order for **regional home**: Hero → Stats Row → Feature Grid → CTA.

Recommended block order for **international home**: Hero → Region Grid → CTA → Values Grid.

## Job listing pages

When **Page template** is `job-listing`, fill in **Job board config**:

- **JobAdder board ID** — market identifier for the job feed.
- **Featured only** — show curated jobs only (UK featured jobs).
- **External apply** — link to JobAdder apply URLs.

Job content itself comes from JobAdder — not entered in Strapi.

## Form pages

For **Teach with us** and similar pages, add a **Lead Form** block (native — submissions appear under **Form Submissions** in the admin).

Legacy register, refer, and partner pages may still use **Form Embed** with a JotForm ID. See [`docs/ia/external-integrations.md`](../ia/external-integrations.md).

## Navigation

Main site navigation is edited in **Content Manager → Market Navigation** (one entry per market):

1. Create or open the entry for your market (`au`, `uk`, etc.).
2. Add **Items** with label and URL (relative slug, e.g. `browse-jobs`).
3. Add **Children** on an item for dropdown links (uses Nav Link, not nested groups).
4. Save.

Navigation URLs are relative slugs or full external URLs (`https://...`).

## Blog articles

1. **Content Manager → Article → Create new entry**.
2. Set **Market** (regional only — no international blog).
3. Write **Excerpt** for listing pages and **Body** for article content.
4. Add **Featured image** and **SEO** fields.
5. Publish.

## SEO checklist

- Meta title: `{Page title} | ANZUK Education` (default pattern).
- Meta description: 120–160 characters summarising the page.
- Set **No index** only for internal/test pages.

## Roles and permissions

Recommended roles (configure in **Settings → Administration Panel → Roles**):

| Role | Access |
|------|--------|
| **AU Editor** | Create/publish AU pages and articles |
| **UK Editor** | Create/publish UK pages and articles |
| **International Editor** | International hub pages |
| **Super Admin** | All markets + Site Settings |

Editors should only publish content for their assigned market unless approved otherwise.

## Preview limitations

Strapi's built-in preview does not match the final ANZUK website design. After publishing, request a staging build from the web team to review changes on the actual site.

## Need help?

- Page inventory and nav structure: [`docs/guides/strapi-prototype-spec.md`](strapi-prototype-spec.md)
- Architecture decisions: [`docs/decisions/008-strapi-url-nav-model.md`](../decisions/008-strapi-url-nav-model.md)
- Technical setup: [`docs/guides/strapi-cloud-setup.md`](strapi-cloud-setup.md)
