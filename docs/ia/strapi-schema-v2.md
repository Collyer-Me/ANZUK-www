# Strapi schema v2 — target content model

Concrete schema implementing [ADR 009](../decisions/009-region-relation-content-model.md). Strapi 5.48. Replaces the as-is model documented in [`strapi-mapping.md`](strapi-mapping.md).

**Axes**
- **Region** — a relation to a `region` entity. The content boundary (au / uk / ca / nz / international). All English today.
- **Locale (i18n)** — language only. Default `en`. Extra languages enabled per region where a real translation exists (e.g. `fr` for Canada).
- **Page type** — semantic enum for SEO/JSON-LD/breadcrumb logic, not layout.
- **Layout** — composed from dynamic-zone blocks.

---

## Collection types

### `region`
The site boundary and its configuration. ~5 records, rarely changes.

| Field | Type | Notes |
|---|---|---|
| `code` | uid | `au`, `uk`, `ca`, `nz`, `international` — URL segment |
| `name` | string | "Australia" |
| `hreflang` | string | `en-AU`, `en-GB`, `en-CA`, `en-NZ`, `x-default` (international) |
| `isDefault` | boolean | Australia = true (drives x-default) |
| `isGlobalHub` | boolean | International = true (renders at `/`, no prefix) |
| `contactEmail` / `contactPhone` | string | per-region |
| `jobAdderBoardId` | string | region default for job-listing pages |
| `geoSuggestEnabled` | boolean | Cloudflare geo banner |
| `header` | component `nav.menu` | header navigation (see Navigation) |
| `footer` | component `nav.footer` | footer columns |
| `defaultSeo` | component `shared.seo` | fallback SEO for pages with none |

`region` is **not** localized at the type level; its child nav components are localized so labels can translate.

### `page`
All marketing pages across all regions.

| Field | Type | Notes |
|---|---|---|
| `title` | string | required, localized |
| `slug` | uid | single segment, targetField `title`; unique within region + locale |
| `region` | relation | `page` belongsTo `region` (many-to-one) |
| `parent` | relation | self, many-to-one → page tree; null = top level |
| `pageType` | enum | semantic type (list below) |
| `body` | dynamiczone | the block library (below), localized |
| `seo` | component `shared.seo` | localized |
| `equivalents` | relation | many-to-many self → genuine cross-region equivalents for hreflang/region-switch |
| `noIndex` | boolean | per page |
| `navLabel` | string | optional short label for nav/breadcrumb; falls back to `title` |
| Draft & Publish | — | enabled |
| i18n | — | localized type |

URL = `/{region.code}/` + ancestor slugs joined + `slug` (international omits the region prefix). Breadcrumbs derive from the `parent` chain. No stored full-path strings; no market prefix.

`pageType` enum (semantic only): `home-international`, `home-regional`, `service-educators`, `service-schools`, `service-leadership`, `sector`, `job-listing`, `blog-listing`, `about`, `team-listing`, `contact`, `faq`, `form-landing`, `policy`, `product`, `process`, `cross-market`, `generic`.

### `article`
Blog posts. Regional.

| Field | Type | Notes |
|---|---|---|
| `title` | string | required, localized |
| `slug` | uid | targetField `title`, unique within region + locale |
| `region` | relation | belongsTo `region` |
| `excerpt` | text | localized |
| `body` | richtext (or blocks) | localized |
| `featuredImage` | media | single image |
| `author` | relation | → `author` (deferred; optional) |
| `category` | relation/enum | optional |
| `seo` | component `shared.seo` | localized |
| Draft & Publish, i18n | — | enabled |

### `section` (reusable shared content)
Edit once, reference from many pages.

| Field | Type | Notes |
|---|---|---|
| `name` | string | internal label ("Global educator CTA") |
| `region` | relation | optional — scope to a region, or leave global |
| `body` | dynamiczone | same block library |
| i18n | — | localized |

Referenced from a page via the `blocks.shared-section` block (below).

---

## Single type

### `global-settings`
Brand-wide, region-agnostic. Per-region values live on `region`.

| Field | Type | Notes |
|---|---|---|
| `organizationName` | string | "ANZUK Education" |
| `organizationUrl` | string | |
| `socialLinks` | component (repeatable) | platform + url |
| `defaultOgImage` | media | global SEO fallback |
| `affiliateBrands` | component (repeatable) `shared.affiliate-brand` | logo + url |
| `scootUrl` / `executiveUrl` | string | affiliate domains |
| i18n | — | localized (for translatable brand copy) |

---

## Block library (dynamic zone)

Each block maps 1:1 to a promoted Astro component in `apps/web/src/components/marketing` (or `ui`). Adding a block = add the schema component + a `BlockRenderer` case that renders the existing component. **Block fields carry content only; visual props (tone, layout variants) map to the component's typed props.**

| Block (`blocks.*`) | Renders | Key fields |
|---|---|---|
| `hero` | `BlobHero` | eyebrow, title (rich inline), subtitle, image, actions (repeatable: label + page-relation/url + variant) |
| `persona-cards` | `PersonaCard` ×N | repeatable: title, description, needs[], iconKey, accent, cta(label + link), featured |
| `stats-band` | `StatsBand` | heading, footnote, stats[] (value, suffix, label) |
| `steps-row` | `StepsRow` | eyebrow, title, description, steps[] (title, description) |
| `value-tabs` | `ValueTabs` | values[] (letter, word, summary, iconKey), autoAdvance |
| `testimonials` | `TestimonialGrid` | eyebrow, title, items[] (quote, name, role) |
| `logo-marquee` | `LogoMarquee` | heading, logos[] (image, alt) |
| `cta-band` | `CtaBand` | heading, body, primary(label+link), secondary(label+link) |
| `region-grid` | `RegionGrid` | heading, subheading, regions[] (name, description, region-relation/url, flagKey, external) |
| `feature-grid` | `FeatureGrid` | heading, features[] (title, description, iconKey) |
| `form-embed` | `FormEmbed` | heading, description, provider (JotForm id), height |
| `rich-text` | `RichText` | content (richtext) |
| `shared-section` | (expands referenced `section`) | relation → `section` |

**Links inside blocks** use a reusable `shared.link` component: either a `page` relation (rename-safe) **or** an external `url`, plus `label` and optional `variant`. No free-text internal hrefs.

`iconKey`/`flagKey`/`accent` are enums matching the brand asset keys and token names the components already accept — keeps "no hardcoded values in components" intact and gives editors a constrained, safe palette.

---

## Navigation

Lives on `region` (not a separate collection), as components:

- `nav.menu` (header): repeatable `nav.item` → `{ link: shared.link, children: nav.item[] }` (2 levels).
- `nav.footer`: repeatable `nav.column` → `{ heading, links: shared.link[] }`.

Because links are `shared.link` (page-relation or external), renaming/moving a page never breaks nav. Localized so labels translate where a region has a translation. Default nav can also be **derived** from the page tree (`parent` + `navLabel` + order) when a region hasn't curated one.

---

## Editor experience & operations

- **Per-region editor scoping.** Add an `editorRegions` mapping (editor → allowed region codes) and enforce with a custom Strapi route policy on `page`/`article` create/update/delete. (Strapi Growth/Enterprise offers this natively via condition-based RBAC + Review Workflows + Content History; the custom policy is the no-cost path — see ADR 009.)
- **Preview.** Configure Strapi 5 Draft Preview to point at an Astro preview deployment (`/preview/...` build or a preview server reading `status=draft`). Editors see drafts before publishing.
- **Publish → rebuild.** Strapi `entry.publish`/`entry.unpublish` webhook → CI deploy hook → Astro rebuild. Without this, publishing a static site appears to do nothing.
- **Field help-text** on every non-obvious field; **list-view** columns (region, pageType, status) + filters configured per content type.
- **Media provider:** S3 or Cloudinary in production (not local disk).
- **Validation:** required fields, enum constraints on icon/flag/accent keys, `uid` slugs.

---

## Astro consumption changes

- `lib/strapi/types.ts` — replace `market` enums with `region` relation; block union mirrors the table above.
- `lib/strapi/queries/*` — filter by `region.code` + `locale`; drop `to/fromStrapiSlug`; resolve URLs/breadcrumbs from the `parent` chain; populate `shared-section` one level deeper.
- `components/blocks/BlockRenderer.astro` — one case per block above, each rendering the promoted component.
- Layouts — `RegionalLayout`/`InternationalLayout` read nav + SEO from `region`; emit hreflang from `page.equivalents` + region `hreflang`.
- `getStaticPaths` — build from `region` + page tree.

---

## Phased plan

1. **Schema** — author the content types/components above in `apps/cms`; enable i18n (`en` default); configure roles, list views, help-text.
2. **Seed** — reseed regions, a representative page tree per region, reusable sections, nav, global settings (replaces market-prefixed mock).
3. **Astro layer** — update types, queries, `BlockRenderer`, layouts; delete the slug-prefix helpers.
4. **Ops** — media provider, preview, publish→rebuild webhook, per-region editor policy.
5. **Verify** — `astro check` + build against live Strapi (`USE_MOCK_DATA=false`); confirm URLs, breadcrumbs, hreflang, preview, and a publish round-trip.

Migration cost is minimal: empty seed, mock data only. This is the cheapest moment to land it.
