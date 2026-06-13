# Local development

## Prerequisites

- Node.js 22+
- npm 10+

## Setup

```bash
# From repository root
npm install

# Copy environment files
cp apps/web/.env.example apps/web/.env
cp apps/cms/.env.example apps/cms/.env
# Edit apps/cms/.env with generated secrets on first Strapi run
```

## Run everything

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Marketing site | http://localhost:4321 |
| Brand guide (noindex) | http://localhost:4321/brand |
| Strapi admin | http://localhost:1337/admin |

## Run individually

```bash
npm run dev:web   # Astro only
npm run dev:cms   # Strapi only
```

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

Astro i18n uses `prefixDefaultLocale: false` because regional routes are explicit via `pages/[region]/`. Unprefixed routes must return HTTP 200 in dev — do not set `prefixDefaultLocale: true` without also switching to manual i18n routing.

For production builds, set `STRAPI_URL` and `STRAPI_API_TOKEN` in `apps/web/.env` to point at Strapi Cloud.

## Monorepo structure

See [ADR 006](../decisions/006-monorepo-apps-layout.md).

## Brand tokens

Edit tokens in `packages/brand/tokens/`. Preview at `/brand/colours`.
