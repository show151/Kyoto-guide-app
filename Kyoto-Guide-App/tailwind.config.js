/** @type {import('tailwindcss').Config} */
module.exports = {
  //NOTE: くそ雑である
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
