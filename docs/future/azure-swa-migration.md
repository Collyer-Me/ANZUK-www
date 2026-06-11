# Azure Static Web Apps migration (future)

**Status:** Not implemented — prototype uses GitHub Pages.

## When to migrate

- Azure access is available
- Enterprise compliance requires Azure hosting
- Custom domains, staging slots, or Azure AD integration needed

## Migration steps

1. Create Azure Static Web App resource
2. Update `.github/workflows/` to deploy to SWA instead of GitHub Pages (or add parallel workflow)
3. Set `SITE_URL` to production domain
4. Remove or adjust Astro `base` if no longer on project-site path
5. Add `staticwebapp.config.json` for routing and security headers

## CMS options

- **Keep Strapi Cloud** — only change static hosting
- **Migrate to Azure App Service** — export/import Strapi data; update `STRAPI_URL`

## References

- [ADR 003: Defer Cloudflare and Azure](../decisions/003-defer-cloudflare-azure.md)
- [Original architecture](../../project_architecture.md)
