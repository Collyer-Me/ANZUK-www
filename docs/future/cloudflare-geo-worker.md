# Cloudflare geo-suggest worker (future)

**Status:** Not implemented — prototype uses in-browser region picker.

## Principle

**Suggest, don't force.** Detect visitor country via `cf-ipcountry` and show a banner suggesting the correct regional site (e.g. `/au/`). Never 302 redirect automatically.

## Implementation sketch

```js
// infra/cloudflare/worker.js (future)
const REGION_MAP = { AU: 'au', GB: 'uk', US: 'us', NZ: 'nz' };

export default {
  async fetch(request, env) {
    const country = request.cf?.country;
    const suggested = REGION_MAP[country];
  // Pass suggestion via header or HTMLRewriter banner injection
  },
};
```

## Prerequisites

- Cloudflare DNS in front of production domain
- Azure SWA or GitHub Pages origin configured
- Banner UI in Astro (React island) to read suggestion and dismiss via cookie

## References

- [ADR 003: Defer Cloudflare and Azure](../decisions/003-defer-cloudflare-azure.md)
