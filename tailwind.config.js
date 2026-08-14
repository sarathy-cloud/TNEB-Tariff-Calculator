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
        artifact: {
          bg: {
            light: '#F4F2EE',
            dark: '#141413',
          },
          surface: {
            light: '#FFFFFF',
            dark: '#1F1F1E',
          },
          panel: {
            light: '#EFECE6',
            dark: '#262624',
          },
          border: {
            light: '#D8D5D0',
            dark: '#333330',
          },
          text: {
            light: '#202020',
            dark: '#ECEBE7',
          },
          muted: {
            light: '#77736D',
            dark: '#9E9C96',
          },
          accent: {
            DEFAULT: '#F97316',
            hover: '#EA580C',
            light: '#FFF1E7',
            dark: '#3A2012',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
