/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: "'Merriweather', serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
