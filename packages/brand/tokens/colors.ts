export const colors = {
  blue: '#00ADEF',
  green: '#3FAC49',
  yellow: '#F6B419',
  purple: '#3C3087',
  lightBlue: '#6DCFF6',
  lightGreen: '#AAD69B',
  lightYellow: '#FBD58F',
  lightPurple: '#B7B0EA',
  extraLightBlue: '#c9edfc',
  extraLightGreen: '#ecf7ed',
  extraLightPurple: '#DEDCF0',
  darkPurple: '#312E48',
  executiveBg: '#312F41',
  title: '#323132',
  content: '#323132',
  gray: '#eee',
  lightGray: '#E0DFE5',
  pageBg: '#f0fafe',
  white: '#ffffff',
  black: '#000000',
  iconNeutral: '#333132',
  iconMuted: '#9E9995',

  /* Semantic state colours (forms, alerts). Text variants meet WCAG AA (≥4.5:1)
     on white; *Bg variants are their pale companions for field/alert fills. */
  error: '#B3261E',
  errorBg: '#FCEBEA',
  success: '#2E7D32',
  successBg: '#ECF7ED',
  warning: '#A16207',
  warningBg: '#FDF3DC',
} as const;

export type BrandColor = keyof typeof colors;
