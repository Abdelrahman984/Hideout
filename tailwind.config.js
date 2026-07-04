/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        ar: ['Cairo', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#1A1A1A',
          light: '#F8F8F8',
          accent: '#3B82F6',
          muted: '#6B7280',
        }
      }
    },
  },
  plugins: [],
}

