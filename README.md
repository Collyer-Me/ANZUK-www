# ANZUK Global Marketing Hub

Monorepo for the ANZUK Education global marketing platform (Astro + Storyblok).

## Structure

| Path | Package | Description |
|------|---------|-------------|
| `apps/web` | `@anzuk/web` | Astro marketing site (Storyblok pilot) |
| `packages/brand` | `@anzuk/brand` | Design tokens, fonts, logos, images |

## Prerequisites

- Node.js 22+
- npm 10+

## Quick start

```bash
# Install all workspace dependencies
npm install

# Run Astro dev server
npm run dev

# Astro only (same as dev)
npm run dev:web
```

- **Marketing site:** https://localhost:4321 (HTTPS in dev for Storyblok Visual Editor)
- **Brand guide:** http://localhost:4321/brand (noindex — internal reference)

See [docs/guides/storyblok-pilot.md](docs/guides/storyblok-pilot.md) for Storyblok space setup.

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

By default, bundled mock CMS data is used. Set `STORYBLOK_DELIVERY_API_TOKEN` in `apps/web/.env` to fetch pilot pages (`/au/`, `/au/who-we-are/`) from Storyblok.

## Documentation

See [docs/README.md](docs/README.md) for ADRs, setup guides, and architecture decisions.

## Architecture

See [project_architecture.md](project_architecture.md) for the full roadmap. Prototype uses GitHub Pages + Strapi Cloud (Azure/Cloudflare deferred).
