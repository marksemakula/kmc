/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0055A4',
          light: '#0066CC',
          dark: '#004483'
        },
        secondary: {
          DEFAULT: '#28A745',
          light: '#34CE57',
          dark: '#218838'
        },
        accent: {
          DEFAULT: '#FFC107',
          light: '#FFCD39',
          dark: '#E5AD06'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}