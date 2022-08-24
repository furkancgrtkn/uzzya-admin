/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        custom: "rgba(149, 157, 165, 0.2) 0px 0px 8px",
      },
      colors: {
        brand: {
          palette: {
            primary: "#437EFD",
          },
          black: {
            primary: "#484848",
            secondary: "#787878",
          },
          background: "#FAFBFC",
          green: "#3ACEA0",
          yellow: "#fb9871",
          red: "#F73859",
        },
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
      animation: {
        enter: "enter 200ms ease-out",
        enterActionBox: "enterActionBox 200ms ease-out",
        enterSelect: "enterSelect 200ms ease-in-out",
        "slide-nav-in": "slide-nav-in 0.3s cubic-bezier(.41,.73,.51,1.02)",
        "slide-nav-out": "slide-nav-out 0.2s cubic-bezier(.41,.73,.51,1.02)",
        "opacity-in": "opacity-in 0.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        enterActionBox: {
          "0%": {
            transform: "scale(0.7)",
            opacity: 0,
          },
          "100%": {
            transform: "scale(1)",
            opacity: 1,
          },
        },
        enterSelect: {
          "0%": {
            maxHeight: "0px",
            transform: "scale(0.8)",
            opacity: 0,
          },
          "100%": {
            maxHeight: "256px",
            transform: "scale(1)",
            opacity: 1,
          },
        },
        "opacity-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-nav-in": {
          "0%": { width: "56px", padding: "16px 8px" },
          "100%": { width: "240px", padding: "16px 16px" },
        },
        "slide-nav-out": {
          "0%": { width: "240px", padding: "16px 16px" },
          "100%": { width: "56px", padding: "16px 8px" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
  ],
};
