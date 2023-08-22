/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        small: "250px",
        medium: "278px",
        large: "320px",
        extra: "368px",
        disable: "462px",
      },
      backgroundColor: {
        light: "#FFF",
        dark: "#080808",
        primary: "#4e73df",
      },
      margin: {
        small: "9px",
        medium: "15px",
        large: "24px",
        extra: "36px",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      textColor: {
        primary: "#4e73df",
      },
      borderColor: {
        primary: "#4e73df",
      },
    },
  },
  plugins: [],
}
