import { getSecret } from 'astro:env/server';

/** Strapi base URL safe to expose in the browser (form POST, media assets). */
export function resolveStrapiPublicUrl(): string {
  const raw =
    getSecret('PUBLIC_STRAPI_URL') ??
    getSecret('STRAPI_URL') ??
    '';

  return typeof raw === 'string' ? raw.replace(/\/$/, '') : '';
}
