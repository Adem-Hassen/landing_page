/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Alexandria', 'IBM Plex Sans Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
        body: ['IBM Plex Sans Arabic', 'Segoe UI', 'Tahoma', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
