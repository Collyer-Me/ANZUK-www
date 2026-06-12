# @anzuk/brand

Single source of truth for ANZUK Education design tokens and static brand assets.

Sourced from the live [anzuk.education](https://anzuk.education/) WordPress theme (`anzuk-home`).

## Directory structure

```
assets/
├── fonts/           Poppins + Roboto (woff2)
├── logos/           Primary SVG wordmarks
│   ├── affiliates/  Scoot, regional ANZUK marks
│   └── partners/    School partner logos (homepage carousel)
├── images/          Hero photography, values photo, regional flags
├── illustrations/   Hero blobs and hand-drawn doodles (SVG)
├── icons/           UI icons + BE GREAT value illustrations
│   └── values/      belief, equity, growth, etc.
└── ui/              Section decorations, overlays, job backgrounds
```

## Tokens

| Path | Purpose |
|------|---------|
| `tokens/colors.ts` | Brand colour palette |
| `tokens/typography.ts` | Font families and type scale |
| `tokens/spacing.ts` | Layout spacing, button dimensions |
| `tokens/voice.ts` | Taglines, personas, tone, BE GREAT values |
| `tokens/effects.ts` | Shadows, hero highlight, section backgrounds |
| `tokens/assets.ts` | Asset manifest with descriptions |
| `styles/tokens.css` | CSS custom properties + @font-face |
| `styles/theme.css` | Tailwind v4 @theme extension |

## Usage in Astro

```ts
import { colors, shadows, brandAssets } from '@anzuk/brand';
import heroBlob from '@anzuk/brand/assets/illustrations/hero-blob-light-blue.svg';
```

```html
<div style={`box-shadow: ${shadows.countryCard}`}>
```

## Brand preview

`/brand/assets` — full asset library browser in the web app.

## Tokens vs CMS

- **Brand tokens & assets:** code in this package
- **Marketing content:** Strapi (`apps/cms`)
