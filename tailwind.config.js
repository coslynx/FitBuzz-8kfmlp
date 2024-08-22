/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#28A745",
        "secondary-color": "#FFC107",
        "light-color": "#FAFAFA",
        "dark-color": "#212529",
        "error-color": "#DC3545",
      },
      fontFamily: {
        "primary-font": ["Roboto", "sans-serif"],
        "secondary-font": ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-bg.svg')",
        "footer-pattern": "url('/images/footer-bg.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};