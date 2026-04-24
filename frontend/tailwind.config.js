import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A0A0A",
        secondary: "#B8A98F",
        surface: "#F7F4EF",
        ink: "#0A0A0A",
        "ink-strong": "#000000",
        "ink-muted": "#3A3A3A",
        line: "#D6D0C4",
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
        serif: ["Manrope", ...defaultTheme.fontFamily.sans],
        display: ["Montserrat", ...defaultTheme.fontFamily.sans],
        body: ["Manrope", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
