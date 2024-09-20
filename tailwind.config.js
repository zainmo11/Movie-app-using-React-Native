/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/index.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}","./navigation/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-neutral': 'linear-gradient(to bottom, #1f1f1f, #2d2d2d)', // adjust colors to your design
      },
    },
  },
  plugins: [],
}

