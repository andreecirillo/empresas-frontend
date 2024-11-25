/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#007BFF",
        secondary: "#6D757D",
        info: "#17A2B8",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        dark: "#343A40",
        light: "#F8F9FA",
      },
    },
  },
  plugins: [],
};
