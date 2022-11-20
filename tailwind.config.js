/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto"],
    },
    screens: {
      md: "824px",
      sm: "495px",
    },
    transitionProperty: {
      height: "height",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
