const modules = import.meta.glob('../../../../packages/brand/assets/**/*.{svg,png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

/** Resolve a path under packages/brand/assets/ to a built URL. */
export function getBrandAssetUrl(relativePath: string): string | undefined {
  const target = relativePath.replace(/\\/g, '/');
  const entry = Object.entries(modules).find(([key]) =>
    key.replace(/\\/g, '/').endsWith(`/assets/${target}`),
  );
  return entry?.[1];
}
