/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        palabra:'#4A4A4A',
        campo:'#ECE9E9',
        'botones':{
        DEFAULT: 'rgba(0, 204, 204, 1)',
        light: 'rgba(0, 204, 204, 0.24)',
        }
      }
    },
  },
  plugins: [],
}
