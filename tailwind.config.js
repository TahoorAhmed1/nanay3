/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Register your custom font here
        quicksand: ['Quicksand', 'sans-serif'], // Register your custom font here
        creato: ['CreatoDisplay', 'sans-serif'], // Register your custom font here
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
