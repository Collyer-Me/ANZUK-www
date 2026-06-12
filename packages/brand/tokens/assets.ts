export type AssetCategory =
  | 'illustrations'
  | 'icons'
  | 'ui'
  | 'images'
  | 'logos'
  | 'affiliates'
  | 'partners'
  | 'fonts';

export interface BrandAsset {
  id: string;
  name: string;
  path: string;
  category: AssetCategory;
  description: string;
}

export const brandAssets: BrandAsset[] = [
  // Illustrations
  { id: 'hero-blob', name: 'Hero blob', path: 'illustrations/hero-blob-light-blue.svg', category: 'illustrations', description: 'Light blue organic shape behind hero photography' },
  { id: 'hero-mask', name: 'Hero photo mask', path: 'illustrations/hero-photo-mask.svg', category: 'illustrations', description: 'Purple blob used to mask hero images' },
  { id: 'hero-doodle-yellow', name: 'Hero doodle (yellow)', path: 'illustrations/hero-doodle-yellow.svg', category: 'illustrations', description: 'Hand-drawn yellow accent beside hero' },
  { id: 'hero-doodle-purple', name: 'Hero doodle (purple)', path: 'illustrations/hero-doodle-purple.svg', category: 'illustrations', description: 'Hand-drawn purple accent beside hero' },

  // Icons
  { id: 'arrow-right', name: 'Arrow right', path: 'icons/arrow-right-blue.svg', category: 'icons', description: 'Button hover arrow (blue)' },
  { id: 'chevron-down', name: 'Chevron down', path: 'icons/chevron-down-blue.svg', category: 'icons', description: 'Dropdown / accordion chevron' },
  { id: 'value-belief', name: 'Belief icon', path: 'icons/values/belief.svg', category: 'icons', description: 'BE GREAT — Belief' },
  { id: 'value-equity', name: 'Equity icon', path: 'icons/values/equity.svg', category: 'icons', description: 'BE GREAT — Equity' },
  { id: 'value-growth', name: 'Growth icon', path: 'icons/values/growth.svg', category: 'icons', description: 'BE GREAT — Growth' },
  { id: 'value-relationships', name: 'Relationships icon', path: 'icons/values/relationships.svg', category: 'icons', description: 'BE GREAT — Relationships' },
  { id: 'value-empower', name: 'Empower icon', path: 'icons/values/empower.svg', category: 'icons', description: 'BE GREAT — Empower' },
  { id: 'value-attitude', name: 'Attitude icon', path: 'icons/values/attitude.svg', category: 'icons', description: 'BE GREAT — Attitude' },
  { id: 'value-team', name: 'Team icon', path: 'icons/values/team.svg', category: 'icons', description: 'BE GREAT — Team' },

  // UI decorations (verified on live theme)
  { id: 'banner-bottom', name: 'Banner bottom', path: 'ui/banner-bottom-bg.png', category: 'ui', description: 'Section divider decoration' },
  { id: 'banner-overlay', name: 'Banner overlay', path: 'ui/banner-img-overlay.png', category: 'ui', description: 'Hero image overlay texture' },
  { id: 'banner-overlay-new', name: 'Banner overlay (alt)', path: 'ui/banner-img-overlay-new.png', category: 'ui', description: 'Updated hero overlay variant' },
  { id: 'job-bg', name: 'Job listing background', path: 'ui/job-bg.svg', category: 'ui', description: 'Jobs section background pattern' },
  { id: 'job-banner-bottom', name: 'Job banner bottom', path: 'ui/job-banner-bottom.png', category: 'ui', description: 'Jobs section bottom decoration' },
  { id: 'blog-overlay', name: 'Blog overlay', path: 'ui/blog-overlay.png', category: 'ui', description: 'Blog card image overlay' },

  // Photography & flags
  { id: 'hero-home', name: 'Hero photography', path: 'images/hero-home.png', category: 'images', description: 'International homepage hero image' },
  { id: 'values-photo', name: 'Values photography', path: 'images/values.jpg', category: 'images', description: 'BE GREAT values section photo' },
  { id: 'flag-aus', name: 'Australia flag', path: 'images/flag-aus.png', category: 'images', description: 'Regional selector — Australia' },
  { id: 'flag-uk', name: 'UK flag', path: 'images/flag-uk.png', category: 'images', description: 'Regional selector — United Kingdom' },
  { id: 'flag-can', name: 'Canada flag', path: 'images/flag-can.png', category: 'images', description: 'Regional selector — Canada' },
  { id: 'flag-usa', name: 'USA flag', path: 'images/flag-usa.png', category: 'images', description: 'Regional selector — USA' },
  { id: 'flag-nz', name: 'New Zealand flag', path: 'images/flag-nz.png', category: 'images', description: 'Regional selector — New Zealand' },

  // Affiliate logos
  { id: 'affiliate-anzuk', name: 'ANZUK sub-brand', path: 'logos/affiliates/anzuk.png', category: 'affiliates', description: 'Regional ANZUK Education mark' },
  { id: 'affiliate-scoot', name: 'Scoot Education', path: 'logos/affiliates/scoot.png', category: 'affiliates', description: 'US affiliate brand logo' },

  // Partner logos (homepage carousel)
  { id: 'partner-inspired', name: 'Inspired Education', path: 'logos/partners/inspired-education.png', category: 'partners', description: 'School partner logo' },
  { id: 'partner-cognita', name: 'Cognita', path: 'logos/partners/cognita-logo.webp', category: 'partners', description: 'School partner logo' },
  { id: 'partner-ais', name: 'AIS', path: 'logos/partners/ais-logo.png', category: 'partners', description: 'Australian International School logo' },
  { id: 'partner-support-1', name: 'Support logo 1', path: 'logos/partners/support-logo1.png', category: 'partners', description: 'Homepage school carousel' },
  { id: 'partner-support-2', name: 'Support logo 2', path: 'logos/partners/support-logo2.png', category: 'partners', description: 'Homepage school carousel' },
  { id: 'partner-support-4', name: 'Support logo 4', path: 'logos/partners/support-logo4.png', category: 'partners', description: 'Homepage school carousel' },
  { id: 'partner-support-6', name: 'Support logo 6', path: 'logos/partners/support-logo6.png', category: 'partners', description: 'Homepage school carousel' },
  { id: 'partner-support-7', name: 'Support logo 7', path: 'logos/partners/support-logo7.png', category: 'partners', description: 'Homepage school carousel' },
];

export const assetCategories: { id: AssetCategory; label: string; description: string }[] = [
  { id: 'illustrations', label: 'Illustrations', description: 'Organic blobs and hand-drawn hero accents' },
  { id: 'icons', label: 'Icons', description: 'UI icons and BE GREAT value illustrations' },
  { id: 'ui', label: 'UI decorations', description: 'Section backgrounds, overlays, and dividers' },
  { id: 'images', label: 'Photography & flags', description: 'Hero images, values photo, regional flags' },
  { id: 'logos', label: 'Wordmarks', description: 'Primary ANZUK Education SVG logos' },
  { id: 'affiliates', label: 'Affiliate brands', description: 'Scoot and regional sub-brand marks' },
  { id: 'partners', label: 'Partner schools', description: 'School logos from homepage carousel' },
  { id: 'fonts', label: 'Fonts', description: 'Poppins and Roboto web font files' },
];
