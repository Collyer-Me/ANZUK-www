# Local development

## Prerequisites

- Node.js 22+
- npm 10+

## Setup

```bash
# From repository root
npm install

# Copy environment file
cp apps/web/.env.example apps/web/.env
# Optional: add STORYBLOK_DELIVERY_API_TOKEN for pilot pages (see storyblok-pilot.md)
```

## Run

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Marketing site | https://localhost:4321 (HTTPS — accept mkcert cert on first visit) |
| Brand guide (noindex) | https://localhost:4321/brand |

## Build

```bash
npm run build
# Output: apps/web/dist/
```

## Type checking

```bash
npm run check:web   # astro check — also runs in CI on pull requests
```

## URL routing (dev)

The site uses a **hybrid URL model** ([ADR 007](../decisions/007-as-is-ia-markets.md)):

- **Unprefixed:** international hub (`/`), brand guide (`/brand/*`), international marketing slugs
- **Locale-prefixed:** regional subsites (`/au/`, `/uk/`, `/ca/`, `/nz/`)

Astro regional routes use explicit `pages/[region]/` paths (`/au/`, `/uk/`, etc.) — not Astro's built-in i18n locale folders. Regional URLs are built with `pageUrl()` from `config/markets.ts`.

## Storyblok

Pilot pages (`/au/`, `/au/who-we-are/`) load from Storyblok when `STORYBLOK_DELIVERY_API_TOKEN` is set. All other routes use bundled mocks. See [storyblok-pilot.md](storyblok-pilot.md).

## Monorepo structure

See [ADR 006](../decisions/006-monorepo-apps-layout.md).

## Brand tokens

Edit tokens in `packages/brand/tokens/`. Preview at `/brand/colours`.
