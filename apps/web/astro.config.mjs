// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { storyblok } from '@storyblok/astro';
import mkcert from 'vite-plugin-mkcert';
import { loadEnv } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const viteEnv = loadEnv(process.env.NODE_ENV ?? 'development', __dirname, '');
const storyblokToken = viteEnv.STORYBLOK_DELIVERY_API_TOKEN ?? '';
const storyblokRegion = viteEnv.STORYBLOK_REGION ?? 'eu';
const isStaticBuild =
  process.env.ASTRO_OUTPUT === 'static' ||
  process.env.CI === 'true' ||
  process.env.npm_lifecycle_event === 'build';

const site = viteEnv.SITE_URL ?? process.env.SITE_URL ?? 'https://localhost:4321';
const base = process.env.BASE_PATH ?? undefined;

const storyblokIntegration = storyblok({
  accessToken: storyblokToken || 'placeholder',
  livePreview: Boolean(storyblokToken) && !isStaticBuild,
  apiOptions: {
    region: storyblokRegion,
  },
  components: {
    page: 'storyblok/Page',
    hero: 'storyblok/Hero',
    'stats-row': 'storyblok/StatsRow',
    'feature-grid': 'storyblok/FeatureGrid',
    cta: 'storyblok/Cta',
    'rich-text': 'storyblok/RichText',
  },
});

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: isStaticBuild ? 'static' : 'server',
  trailingSlash: 'always',
  integrations: [
    storyblokIntegration,
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
    plugins: [
      tailwindcss(),
      ...(!isStaticBuild ? [mkcert()] : []),
    ],
    server: !isStaticBuild
      ? {
          headers: {
            // Allow Storyblok Visual Editor to embed localhost in an iframe
            'Content-Security-Policy': 'frame-ancestors https://app.storyblok.com https://*.storyblok.com',
          },
        }
      : undefined,
    resolve: {
      alias: {
        '@anzuk/brand': path.resolve(__dirname, '../../packages/brand'),
      },
    },
    optimizeDeps: {
      include: [
        '@rudderstack/analytics-js',
        '@rudderstack/analytics-js/bundled',
        '@storyblok/astro',
        '@storyblok/astro/toolbarApp.ts',
      ],
    },
  },
});
