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
        'custom': '0px 0px 50px 0px rgba(0, 0, 0, 0.08)',
        'custom1': '0px 0px 50px 0px rgba(0, 0, 0, 0.04)',
        'custom2': '0px 0px 50px 2px rgba(0, 0, 0, 0.04)', // Ajuste esses valores
      },
    },
  },
  plugins: [],
}