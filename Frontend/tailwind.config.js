// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '6px 6px 8px rgba(0, 0, 0, 0.1)', // Ajuste esses valores
      },
    },
  },
  plugins: [],
}