/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1a202c', // Example dark background color
        darkText: '#cbd5e0', // Example dark text color
        lightBg: '#ffffff', // Example light background color
        lightText: '#000000', // Example light text color
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}