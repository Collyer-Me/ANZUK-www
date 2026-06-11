# ADR 006: Monorepo apps layout

**Status:** Accepted

**Date:** 2026-06-11

## Context

The original plan assumed Astro at the repository root (`src/`) and Strapi in `cms/`. A prior scaffold created an npm workspaces monorepo with `apps/web`, `apps/cms`, and `packages/brand`.

## Decision

**Keep the monorepo layout** as scaffolded:

| Path | Package | Role |
|------|---------|------|
| `apps/web` | `@anzuk/web` | Astro static marketing site |
| `apps/cms` | `@anzuk/cms` | Strapi headless CMS (schema dev) |
| `packages/brand` | `@anzuk/brand` | Design tokens, fonts, logos |

Do not relocate Astro to the repo root. All frontend paths in docs and rules reference `apps/web/src/`.

## Consequences

### Positive

- Clear separation of concerns
- `@anzuk/brand` shared package already powers `/brand` style guide
- `npm run dev` runs web + CMS concurrently
- Standard monorepo pattern for growing teams

### Negative

- Docs and CI paths differ from original flat layout plan
- GitHub Actions must build from `apps/web` context

### Neutral

- Root `npm run build` delegates to `@anzuk/web`

## References

- [Root README](../../README.md)
- [Brand package](../../packages/brand/README.md)
