// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? undefined;

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'au',
    locales: ['au', 'uk', 'ca', 'nz'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'au',
        locales: {
          au: 'en-AU',
          uk: 'en-GB',
          ca: 'en-CA',
          nz: 'en-NZ',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@anzuk/brand': path.resolve(__dirname, '../../packages/brand'),
      },
    },
    define: {
      'import.meta.env.PUBLIC_STRAPI_URL': JSON.stringify(
        process.env.PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? '',
      ),
    },
    optimizeDeps: {
      include: ['@rudderstack/analytics-js', '@rudderstack/analytics-js/bundled'],
    },
  },
});
