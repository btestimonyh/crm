/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '920px',
      'lg': '1140px',
      'xl': '1360px',
    },
    extend: {
    },
  },
  plugins: [],
}