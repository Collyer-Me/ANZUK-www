# GitHub Pages deploy

## Overview

GitHub Actions builds the Astro site and deploys `apps/web/dist/` to GitHub Pages on push to `main`, manual workflow dispatch, or Storyblok publish (via webhook proxy).

## One-time setup

1. Push the repository to GitHub
2. **Settings → Pages → Build and deployment → Source:** GitHub Actions
3. **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `STORYBLOK_DELIVERY_API_TOKEN` | Public delivery token (published stories) |
| `STORYBLOK_REGION` | `eu` |
| `SITE_URL` | `https://collyer-me.github.io/ANZUK-www` |
| `BASE_PATH` | `/ANZUK-www` |

4. If using a **project site** (`org.github.io/repo-name/`), `BASE_PATH` must match the repo name segment.

## Workflow

Workflow file: `.github/workflows/deploy-pages.yml`

Triggers:

- `push` to `main`
- `workflow_dispatch` (manual)
- `repository_dispatch` type `storyblok-publish` (Storyblok publish webhook via proxy)

## Storyblok auto-deploy (optional)

Storyblok webhooks cannot POST to GitHub directly. See [Storyblok pilot guide — Auto-deploy on publish](storyblok-pilot.md#auto-deploy-on-publish) for the `github-dispatch-proxy.mjs` setup.

## Verify deploy

1. Check Actions tab for successful run
2. Open https://collyer-me.github.io/ANZUK-www/
3. Confirm `/`, `/au/`, `/uk/`, `/ca/`, `/nz/` render
4. View source: verify canonical, hreflang, and JSON-LD use `SITE_URL`
5. AU pilot pages (`/au/`, `/au/who-we-are/`) should reflect published Storyblok content

## References

- [ADR 002: GitHub Pages hosting](../decisions/002-github-pages-hosting.md)
- [ADR 005: GitHub Pages URL](../decisions/005-github-pages-url-tbd.md)
- [Storyblok pilot guide](storyblok-pilot.md)
