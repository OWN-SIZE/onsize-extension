const colors = {
  yellow: '#FBF26C',
  yellow01: '#FFFAAD',
  blue: '#212530',
  lightGrey: '#fafafa',
  gray000: '#FFFFFF',
  gray050: '#fafafa',
  gray100: '#f6f6f6',
  gray150: '#ebebeb',
  gray200: '#dcdcdc',
  gray250: '#c2c2c2',
  gray300: '#a7a7a7',
  gray350: '#8e8e8e',
  gray400: '#717171',
  gray550: '#444444',
  gray500: '#2f2f2f',
  gray600: '#222222',
  black: '#1E2025',
  card_hover: 'rgba(47, 47, 47, 0.4)',
  icon_hover: 'rgba(235, 235, 235, 0.5);',
} as const;

interface Font {
  weight: 300 | 400 | 500 | 600 | 700 | 800;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
}

function FONT({ weight, size, lineHeight, letterSpacing }: Font): string {
  return `
      font-family: 'Noto Sans', 'Noto Sans KR', sans-serif;
      font-weight: ${weight};
      font-size: ${size}rem;
      line-height: ${lineHeight}rem;
      ${letterSpacing && `letter-spacing: -0.0${letterSpacing}rem;`}
    `;
}

const fonts = {
  title1: FONT({ weight: 600, size: 1.8, lineHeight: 2.5 }),
  title2: FONT({ weight: 600, size: 1.6, lineHeight: 1.9 }),
  title3: FONT({ weight: 500, size: 1.6, lineHeight: 1.9 }),
  body1: FONT({ weight: 500, size: 1.4, lineHeight: 1.9 }),
  body2: FONT({ weight: 600, size: 1.4, lineHeight: 1.9 }),
  body3: FONT({ weight: 500, size: 1.4, lineHeight: 1.9 }),
  bodydsb: FONT({ weight: 600, size: 1.2, lineHeight: 1.6 }),
  radioText: FONT({ weight: 500, size: 1.2, lineHeight: 1.6 }),
} as const;

const theme = {
  colors,
  fonts,
} as const;

export default theme;
