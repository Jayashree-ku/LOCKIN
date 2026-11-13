/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#14213D',
          50: '#f0f3fa',
          100: '#dce3f3',
          200: '#bccbe9',
          300: '#92acdc',
          400: '#6388cb',
          500: '#4166b8',
          600: '#314fa1',
          700: '#283f83',
          800: '#24366b',
          900: '#14213D',
          950: '#0c1426',
        },
        cream: {
          DEFAULT: '#F4EDE0',
          50: '#fcfbf8',
          100: '#f9f6f0',
          200: '#f4ede0',
          300: '#e9dac2',
          400: '#dbc09f',
          500: '#cfa67f',
          600: '#be8c65',
          700: '#9e7051',
          800: '#7f5a43',
          900: '#684a39',
          muted: '#D8CDB9',
        },
        midnight: {
          DEFAULT: '#0B0B0C',
          50: '#18181b',
          100: '#131315',
          200: '#0F0F10',
          900: '#0B0B0C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-caveat)', 'cursive'],
      },
      backgroundImage: {
        'cosmic-glow': 'radial-gradient(circle at 50% 0%, rgba(20, 33, 61, 0.8) 0%, rgba(11, 11, 12, 1) 70%)',
        'subtle-grid': 'radial-gradient(rgba(244, 237, 224, 0.08) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(244, 237, 224, 0.15)',
        'glow-blue': '0 0 30px -5px rgba(65, 102, 184, 0.3)',
      },
    },
  },
  plugins: [],
};
