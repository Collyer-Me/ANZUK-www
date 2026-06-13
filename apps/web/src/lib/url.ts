const base = import.meta.env.BASE_URL;

/** Build an internal URL that respects Astro `base` (e.g. /ANZUK-www/ on GitHub Pages). */
export function withBase(path: string): string {
  const normalized = path.replace(/^\//, '');
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${base}${withSlash}`;
}

/** Build a static asset URL (no trailing slash — for favicons, images in public/). */
export function assetWithBase(path: string): string {
  const normalized = path.replace(/^\//, '');
  return `${base}${normalized}`;
}

/** Strip the configured base path so routes can be compared (e.g. /brand/voice). */
export function stripBase(pathname: string): string {
  const basePath = base.replace(/\/$/, '');
  let path = pathname.replace(/\/$/, '') || '/';

  if (basePath && basePath !== '/' && path.startsWith(basePath)) {
    path = path.slice(basePath.length) || '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

/** Normalize a route for active-nav comparisons. */
export function routeKey(pathname: string): string {
  return stripBase(pathname).replace(/\/$/, '') || '/';
}
