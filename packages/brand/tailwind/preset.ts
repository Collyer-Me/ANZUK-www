import type { Config } from 'tailwindcss';
import { colors } from '../tokens/colors';
import { fontFamilies, fontSizes, fluidFontSizes } from '../tokens/typography';
import { spacing } from '../tokens/spacing';

/**
 * Tailwind v3-style preset for reference and tooling.
 * Astro app uses Tailwind v4 via styles/theme.css @theme block.
 */
export const brandPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        anzuk: {
          blue: colors.blue,
          green: colors.green,
          yellow: colors.yellow,
          purple: colors.purple,
          'light-blue': colors.lightBlue,
          'light-green': colors.lightGreen,
          'light-yellow': colors.lightYellow,
          'light-purple': colors.lightPurple,
          'extra-light-blue': colors.extraLightBlue,
          'extra-light-green': colors.extraLightGreen,
          'extra-light-purple': colors.extraLightPurple,
          'dark-purple': colors.darkPurple,
          'executive-bg': colors.executiveBg,
          title: colors.title,
          content: colors.content,
          gray: colors.gray,
          'light-gray': colors.lightGray,
          'page-bg': colors.pageBg,
          'icon-neutral': colors.iconNeutral,
          'icon-muted': colors.iconMuted,
          error: colors.error,
          'error-bg': colors.errorBg,
          success: colors.success,
          'success-bg': colors.successBg,
          warning: colors.warning,
          'warning-bg': colors.warningBg,
        },
      },
      fontFamily: {
        sans: [fontFamilies.primary],
        secondary: [fontFamilies.secondary],
      },
      fontSize: {
        'anzuk-body': [fontSizes.body.size, { lineHeight: fontSizes.body.lineHeight }],
        'anzuk-h1': [fontSizes.h1.size, { lineHeight: fontSizes.h1.lineHeight, letterSpacing: fontSizes.h1.letterSpacing }],
        'anzuk-h2': [fontSizes.h2.size, { lineHeight: fontSizes.h2.lineHeight, letterSpacing: fontSizes.h2.letterSpacing }],
        'anzuk-h3': [fontSizes.h3.size, { lineHeight: fontSizes.h3.lineHeight, letterSpacing: fontSizes.h3.letterSpacing }],
        'anzuk-h4': [fontSizes.h4.size, { lineHeight: fontSizes.h4.lineHeight, letterSpacing: fontSizes.h4.letterSpacing }],
        'anzuk-h5': [fontSizes.h5.size, { lineHeight: fontSizes.h5.lineHeight, letterSpacing: fontSizes.h5.letterSpacing }],
        'anzuk-h6': [fontSizes.h6.size, { lineHeight: fontSizes.h6.lineHeight, letterSpacing: fontSizes.h6.letterSpacing }],
        'anzuk-h1-fluid': [fluidFontSizes.h1.size, { lineHeight: fluidFontSizes.h1.lineHeight, letterSpacing: fluidFontSizes.h1.letterSpacing }],
        'anzuk-h2-fluid': [fluidFontSizes.h2.size, { lineHeight: fluidFontSizes.h2.lineHeight, letterSpacing: fluidFontSizes.h2.letterSpacing }],
        'anzuk-h3-fluid': [fluidFontSizes.h3.size, { lineHeight: fluidFontSizes.h3.lineHeight, letterSpacing: fluidFontSizes.h3.letterSpacing }],
      },
      spacing: {
        'anzuk-section': spacing.section,
        'anzuk-content': spacing.content,
        'anzuk-banner': spacing.banner,
      },
      maxWidth: {
        'anzuk-container': spacing.containerMax,
      },
      borderRadius: {
        'anzuk-button': spacing.buttonRadius,
        'anzuk-card': spacing.cardRadius,
      },
      minHeight: {
        'anzuk-button': spacing.buttonHeight,
      },
      minWidth: {
        'anzuk-button': spacing.buttonMinWidth,
      },
    },
  },
};

export default brandPreset;
