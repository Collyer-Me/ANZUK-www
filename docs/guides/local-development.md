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

For production builds, set `STRAPI_URL` and `STRAPI_API_TOKEN` in `apps/web/.env` to point at Strapi Cloud.

## Monorepo structure

See [ADR 006](../decisions/006-monorepo-apps-layout.md).

## Brand tokens

Edit tokens in `packages/brand/tokens/`. Preview at `/brand/colours`.
