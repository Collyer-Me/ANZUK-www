/** Resolve a route param in static (getStaticPaths props) or SSR (URL params) mode. */
export function routeParam(
  params: Record<string, string | undefined>,
  props: Record<string, unknown>,
  key: string,
): string | undefined {
  const fromParams = params[key];
  if (fromParams !== undefined && fromParams !== '') return fromParams;
  const fromProps = props[key];
  return typeof fromProps === 'string' ? fromProps : undefined;
}

/** Rest/splat param — Astro may pass string or string[]. */
export function routeSlug(
  params: Record<string, string | string[] | undefined>,
  props: Record<string, unknown>,
  key = 'slug',
): string {
  const raw = params[key] ?? props[key];
  if (Array.isArray(raw)) return raw.join('/');
  if (typeof raw === 'string') return raw;
  return '';
}
