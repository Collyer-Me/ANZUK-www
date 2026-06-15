# GitHub Pages deploy

## Overview

GitHub Actions builds the Astro site and deploys `apps/web/dist/` to GitHub Pages on push to `main`.

## One-time setup

1. Push the repository to GitHub
2. **Settings → Pages → Build and deployment → Source:** GitHub Actions
3. **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|--------|-------|
| `STRAPI_URL` | Strapi Cloud project URL |
| `STRAPI_API_TOKEN` | Read-only API token |
| `SITE_URL` | `https://collyer-me.github.io/ANZUK-www` |
| `BASE_PATH` | `/ANZUK-www` |

4. If using a **project site** (`org.github.io/repo-name/`), set repository variable or secret for `BASE_PATH` and configure Astro `base` accordingly.

## Workflow

Workflow file: `.github/workflows/deploy-pages.yml`

Triggers: `push` to `main`, `workflow_dispatch`

## Verify deploy

1. Check Actions tab for successful run
2. Open the GitHub Pages URL
3. Confirm `/`, `/au/`, `/uk/`, `/ca/`, `/nz/` render
4. View source: verify canonical, hreflang, and JSON-LD use `SITE_URL`
5. Test lead form at `/uk/teach-with-us/` (incognito → Ketch consent → submit → Strapi **Form Submissions**)

CORS for form POSTs is configured in `apps/cms/config/env/production/middlewares.ts` — see [Strapi Cloud setup](strapi-cloud-setup.md#8-cors-browser-form-submissions).

## Update ADR 005

When the final URL is known, record it in [ADR 005](../decisions/005-github-pages-url-tbd.md).

## References

- [ADR 002: GitHub Pages hosting](../decisions/002-github-pages-hosting.md)
