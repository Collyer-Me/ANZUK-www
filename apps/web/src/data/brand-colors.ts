import { colors } from '@anzuk/brand';

export const brandColorSwatches = [
  { name: 'Blue', key: 'blue', hex: colors.blue, cssVar: '--anzuk-blue', tailwindClass: 'bg-anzuk-blue', description: 'Primary CTA, links, header bar' },
  { name: 'Green', key: 'green', hex: colors.green, cssVar: '--anzuk-green', tailwindClass: 'bg-anzuk-green', description: 'Hero highlights, values accents' },
  { name: 'Yellow', key: 'yellow', hex: colors.yellow, cssVar: '--anzuk-yellow', tailwindClass: 'bg-anzuk-yellow', description: 'Secondary CTA' },
  { name: 'Purple', key: 'purple', hex: colors.purple, cssVar: '--anzuk-purple', tailwindClass: 'bg-anzuk-purple', description: 'Headline accents' },
  { name: 'Light blue', key: 'lightBlue', hex: colors.lightBlue, cssVar: '--anzuk-light-blue', tailwindClass: 'bg-anzuk-light-blue', description: 'Decorative blobs' },
  { name: 'Light green', key: 'lightGreen', hex: colors.lightGreen, cssVar: '--anzuk-light-green', tailwindClass: 'bg-anzuk-light-green', description: 'Values accordion borders' },
  { name: 'Light yellow', key: 'lightYellow', hex: colors.lightYellow, cssVar: '--anzuk-light-yellow', tailwindClass: 'bg-anzuk-light-yellow' },
  { name: 'Light purple', key: 'lightPurple', hex: colors.lightPurple, cssVar: '--anzuk-light-purple', tailwindClass: 'bg-anzuk-light-purple', description: 'Illustration fills' },
  { name: 'Extra light blue', key: 'extraLightBlue', hex: colors.extraLightBlue, cssVar: '--anzuk-extra-light-blue', tailwindClass: 'bg-anzuk-extra-light-blue', description: 'Header background' },
  { name: 'Extra light green', key: 'extraLightGreen', hex: colors.extraLightGreen, cssVar: '--anzuk-extra-light-green', tailwindClass: 'bg-anzuk-extra-light-green' },
  { name: 'Extra light purple', key: 'extraLightPurple', hex: colors.extraLightPurple, cssVar: '--anzuk-extra-light-purple', tailwindClass: 'bg-anzuk-extra-light-purple' },
  { name: 'Dark purple', key: 'darkPurple', hex: colors.darkPurple, cssVar: '--anzuk-dark-purple', tailwindClass: 'bg-anzuk-dark-purple', description: 'Dark sections' },
  { name: 'Title / content', key: 'title', hex: colors.title, cssVar: '--anzuk-title', tailwindClass: 'bg-anzuk-title', description: 'Body and heading text' },
  { name: 'Page background', key: 'pageBg', hex: colors.pageBg, cssVar: '--anzuk-page-bg', tailwindClass: 'bg-anzuk-page-bg', description: 'Default page background' },
  { name: 'Light gray', key: 'lightGray', hex: colors.lightGray, cssVar: '--anzuk-light-gray', tailwindClass: 'bg-anzuk-light-gray', description: 'Borders, subtle UI' },
] as const;
