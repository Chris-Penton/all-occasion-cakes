/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      primary: '#F5CDBE',
      secondary: '#752424',
      bgPrimary: '#1B2E3C',
      bgSecondary: '#f3f4f6',
      iconsPrimary: '#9CA3AF',
      lpOne: '#f7e5e5',
      lpTwo: '#d1f9c7',
      lpThree: '#fcd59e',
      lpFour: '#f5cdc1',
      lpFive: '#def6ff',
      lpSix: '#fec6b5',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-lpOne|lpTwo|lpThree|lpFour|lpFive|lpSix/,
    },
  ],
}
