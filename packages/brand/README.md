# @anzuk/brand

Single source of truth for ANZUK Education design tokens and static brand assets.

## What lives here

| Path | Purpose |
|------|---------|
| `tokens/` | Typed TypeScript tokens (colors, typography, spacing) |
| `styles/tokens.css` | CSS custom properties and `@font-face` rules |
| `styles/theme.css` | Tailwind v4 `@theme` extension |
| `tailwind/preset.ts` | Tailwind v3-style preset for reference |
| `assets/fonts/` | Poppins and Roboto web fonts |
| `assets/logos/` | SVG wordmarks |
| `assets/images/` | Hero, flags, favicon, photography |

## Usage in Astro (`apps/web`)

```css
/* src/styles/global.css */
@import "@anzuk/brand/styles/tokens.css";
@import "@anzuk/brand/styles/theme.css";
```

```ts
import { colors } from '@anzuk/brand';
```

```html
<button class="bg-anzuk-blue text-white rounded-anzuk-button">CTA</button>
```

## Tokens vs CMS

- **Brand tokens** (colors, fonts, spacing): code in this package
- **Marketing content** (copy, pages, jobs): Strapi (`apps/cms`)

Do not hardcode hex values in components — import from `@anzuk/brand` or use Tailwind `anzuk-*` classes.

## Brand preview

Run the web app and open `/brand` for the live style guide (noindex in production).

## Asset inventory

### Fonts
- Poppins: Regular, Medium, SemiBold, Bold
- Roboto: Regular

### Logos
- `anzuk-education.svg` — default (black wordmark, blue accents)
- `anzuk-education-white.svg` — reversed for dark backgrounds

### Images
- `hero-home.png`, `values.jpg`, `favicon.ico`, `banner-bottom-bg.png`
- Regional flags: `flag-aus.png`, `flag-uk.png`, `flag-can.png`, `flag-usa.png`, `flag-nz.png`
