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
        'custom': '0px 0px 20px 3px rgba(0, 0, 0, 0.1)', // Ajuste esses valores
      },
    },
  },
  plugins: [],
}