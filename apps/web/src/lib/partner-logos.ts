import type { ImageMetadata } from 'astro';
import aisLogo from '@anzuk/brand/assets/logos/partners/ais-logo.png';
import aisVietnam from '@anzuk/brand/assets/logos/partners/ais-vietnam.png';
import cognita from '@anzuk/brand/assets/logos/partners/cognita-logo.webp';
import inspired from '@anzuk/brand/assets/logos/partners/inspired-education.png';
import support1 from '@anzuk/brand/assets/logos/partners/support-logo1.png';
import support2 from '@anzuk/brand/assets/logos/partners/support-logo2.png';
import support4 from '@anzuk/brand/assets/logos/partners/support-logo4.png';
import support6 from '@anzuk/brand/assets/logos/partners/support-logo6.png';
import support7 from '@anzuk/brand/assets/logos/partners/support-logo7.png';

export interface PartnerLogoEntry {
  src: ImageMetadata;
  alt: string;
}

export const partnerLogos: PartnerLogoEntry[] = [
  { src: inspired, alt: 'Inspired Education Group' },
  { src: cognita, alt: 'Cognita Schools' },
  { src: aisLogo, alt: 'AIS' },
  { src: aisVietnam, alt: 'AIS Vietnam' },
  { src: support1, alt: 'Partner school' },
  { src: support2, alt: 'Partner school' },
  { src: support4, alt: 'Partner school' },
  { src: support6, alt: 'Partner school' },
  { src: support7, alt: 'Partner school' },
];
