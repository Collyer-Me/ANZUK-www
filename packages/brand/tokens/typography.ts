export const fontFamilies = {
  primary: '"Poppins", system-ui, sans-serif',
  secondary: '"Roboto", system-ui, sans-serif',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fontSizes = {
  body: { size: '18px', lineHeight: '1.5' },
  font16: { size: '16px', lineHeight: '24px' },
  font18: { size: '18px', lineHeight: '27px' },
  h1: { size: '80px', lineHeight: '1.25', letterSpacing: '-0.02em' },
  h2: { size: '61px', lineHeight: '1.25', letterSpacing: '-0.02em' },
  h3: { size: '47px', lineHeight: '1.25', letterSpacing: '-0.02em' },
  h4: { size: '36px', lineHeight: '1.25', letterSpacing: '-0.02em' },
  h5: { size: '27px', lineHeight: '1.4', letterSpacing: '-0.02em' },
  h6: { size: '21px', lineHeight: '1.4', letterSpacing: '-0.02em' },
  sectionTitle1: { size: '61px', lineHeight: '1.25' },
  sectionTitle2: { size: '47px', lineHeight: '1.25' },
  sectionTitle3: { size: '36px', lineHeight: '1.25' },
  sectionTitle4: { size: '27px', lineHeight: '1.4' },
} as const;
