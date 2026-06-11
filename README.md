# ANZUK Global Marketing Hub

Monorepo for the ANZUK Education global marketing platform (Astro + Strapi).

## Structure

| Path | Package | Description |
|------|---------|-------------|
| `apps/web` | `@anzuk/web` | Astro static marketing site |
| `apps/cms` | `@anzuk/cms` | Strapi headless CMS |
| `packages/brand` | `@anzuk/brand` | Design tokens, fonts, logos, images |

## Prerequisites

- Node.js 22+
- npm 10+

## Quick start

```bash
# Install all workspace dependencies
npm install

# Run Astro + Strapi together
npm run dev

# Astro only
npm run dev:web

# Strapi only
npm run dev:cms
```

- **Marketing site:** http://localhost:4321
- **Brand guide:** http://localhost:4321/brand (noindex — internal reference)
- **Strapi admin:** http://localhost:1337/admin (create admin user on first run)

## Brand system

Design tokens live in `packages/brand`. The `/brand` pages are a live style guide that uses the same components and tokens as production pages.

```bash
# Change a colour token
packages/brand/tokens/colors.ts

# Preview in browser
npm run dev:web
# open /brand/colours
```

See [packages/brand/README.md](packages/brand/README.md) for details.

## Build

```bash
npm run build
```

Outputs static site to `apps/web/dist/`.

## Regional sites

| Market | URL |
|--------|-----|
| International hub | http://localhost:4321/ |
| Australia | http://localhost:4321/au/ |
| United Kingdom | http://localhost:4321/uk/ |
| Canada | http://localhost:4321/ca/ |
| New Zealand | http://localhost:4321/nz/ |
| United States (Scoot) | https://scoot.education — external link |

See [docs/ia/](docs/ia/README.md) for the as-is production page inventory.

By default, mock CMS data is used (`USE_MOCK_DATA=true` in `apps/web/.env.example`). Set Strapi Cloud credentials to fetch live content.

## Documentation

See [docs/README.md](docs/README.md) for ADRs, setup guides, and architecture decisions.

## Architecture

See [project_architecture.md](project_architecture.md) for the full roadmap. Prototype uses GitHub Pages + Strapi Cloud (Azure/Cloudflare deferred).
