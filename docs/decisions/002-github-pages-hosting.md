# ADR 002: GitHub Pages for prototype hosting

**Status:** Accepted

**Date:** 2026-06-11

## Context

The prototype needs a publicly accessible static site without Azure Static Web Apps access. The Astro build outputs static HTML suitable for any static host.

## Decision

Deploy the Astro build (`apps/web/dist/`) to **GitHub Pages** via GitHub Actions on push to `main`. Use the official `actions/deploy-pages` workflow pattern.

`SITE_URL` must match the deployed GitHub Pages URL for correct canonical tags, hreflang, and JSON-LD.

## Consequences

### Positive

- Free hosting tied to the Git repository
- No cloud account required for the prototype
- Simple CI/CD with GitHub Actions
- Easy migration path to Azure SWA (change deploy target and `SITE_URL`)

### Negative

- GitHub Pages has no edge geo-routing (region picker handles UX in-browser)
- Project-site URLs require a `base` path in Astro config
- Build must reach Strapi Cloud API (secrets in GitHub)

### Neutral

- Custom domain can be added later via GitHub Pages settings

## References

- [GitHub Pages deploy guide](../guides/github-pages-deploy.md)
- [ADR 005: GitHub Pages URL TBD](005-github-pages-url-tbd.md)
