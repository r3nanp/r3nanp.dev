const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gray: {
        0: '#fff',
        100: '#fafafa',
        200: '#eaeaea',
        300: '#999999',
        400: '#888888',
        500: '#666666',
        600: '#444444',
        700: '#333333',
        800: '#222222',
        900: '#111111'
      }
    },
    fontFamily: {
      sans: ['Poppins', ...fontFamily.sans]
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
