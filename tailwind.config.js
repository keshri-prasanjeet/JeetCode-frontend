/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['"Noto Sans Mono"', 'sans-serif'],
        // Add more custom fonts as needed
      },
    },
  },
  plugins: [],
}

