# ADR 005: GitHub Pages URL TBD

**Status:** Accepted (URL confirmed 2026-06-11)

**Date:** 2026-06-11

## Context

GitHub Pages URL format depends on whether the repository is published as an organisation site (`https://org.github.io/`) or a project site (`https://org.github.io/repo-name/`). The repository org and name were not confirmed at plan time.

## Decision

Use a **placeholder** `SITE_URL` in development (`http://localhost:4321`) and document the final URL when the GitHub repository is confirmed.

When the URL is known:

1. Set `SITE_URL` in GitHub Actions secrets
2. If project site: set Astro `base` to `/repo-name/`
3. Update this ADR status to Accepted with the final URL recorded below
4. Rebuild and verify canonical/hreflang/JSON-LD absolute URLs

**Repository:** https://github.com/Collyer-Me/ANZUK-www (public)

**GitHub Pages URL (project site):** https://collyer-me.github.io/ANZUK-www/

**Astro config:**
- `SITE_URL=https://collyer-me.github.io/ANZUK-www`
- `BASE_PATH=/ANZUK-www`

## Consequences

### Positive

- Development is not blocked on repository naming
- Single env var change updates all SEO absolute URLs

### Negative

- Canonical and JSON-LD URLs are incorrect until `SITE_URL` is set for production
- Project-site `base` path must be configured before first deploy

### Neutral

- Local dev works with localhost URL

## References

- [ADR 002: GitHub Pages hosting](002-github-pages-hosting.md)
- [GitHub Pages deploy guide](../guides/github-pages-deploy.md)
