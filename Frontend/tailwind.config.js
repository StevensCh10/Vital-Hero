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
        'custom': '2px 4px 8px rgba(0, 0, 0, 0.3)', // Ajuste esses valores
      },
    },
  },
  plugins: [],
}