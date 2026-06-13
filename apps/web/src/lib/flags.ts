import type { ImageMetadata } from 'astro';
import flagAus from '@anzuk/brand/assets/images/flag-aus.png';
import flagCan from '@anzuk/brand/assets/images/flag-can.png';
import flagNz from '@anzuk/brand/assets/images/flag-nz.png';
import flagUk from '@anzuk/brand/assets/images/flag-uk.png';
import flagUsa from '@anzuk/brand/assets/images/flag-usa.png';

export type FlagKey = 'aus' | 'uk' | 'can' | 'nz' | 'usa';

export const flagImages: Record<FlagKey, ImageMetadata> = {
  aus: flagAus,
  uk: flagUk,
  can: flagCan,
  nz: flagNz,
  usa: flagUsa,
};
