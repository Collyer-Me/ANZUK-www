# Project rules — ANZUK Global Marketing Hub

Coding standards for the marketing hub monorepo. Cursor rules in `.cursor/rules/` enforce these automatically.

## Repository layout

- `apps/web` — Astro frontend
- `apps/cms` — Strapi CMS (local schema dev)
- `packages/brand` — Design tokens and static assets
- `docs/decisions/` — Architecture Decision Records (check before architectural changes)

## HTML and accessibility

- Use semantic elements: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- One `<h1>` per page; do not skip heading levels
- All images require meaningful `alt` text

## Regional routing

- URL segments: `au`, `uk`, `us`, `nz` (lowercase)
- hreflang / `lang` / `inLanguage`: BCP 47 (`en-AU`, `en-GB`, `en-US`, `en-NZ`)
- Use `getRelativeLocaleUrl()` / `getAbsoluteLocaleUrl()` — never hardcode `/au/` paths
- Default region: Australia (`au`)

## SEO

- Every regional page: self-referencing canonical + reciprocal hreflang for all four regions + `x-default`
- Trailing slashes enforced consistently (`trailingSlash: 'always'`)
- Brand guide at `/brand` always `noindex, nofollow`

## JSON-LD

- Use `@graph` with stable `@id` anchors
- One `Organization` entity site-wide; regional `WebPage` children with `inLanguage`
- `url` and `@id` must match canonical URL

## Brand

- Colours, typography, spacing from `@anzuk/brand` only — no hardcoded hex in components
- Use `Button.astro` and `Logo.astro` for consistent UI

## Astro

- `output: 'static'` — all Strapi fetches at build time
- React islands only where interactivity is required
- Marketing content from Strapi; static brand from `packages/brand`

## CMS

- Strapi locale is source of truth for regional content — no duplicate `Region` field
- Always pass `locale` explicitly in API requests
