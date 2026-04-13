import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F3F5ED",
        secondary: "#F4F4F5",
        surface: "#F3F5ED",
        ink: "#23211F",
        "ink-strong": "#1A1410",
        "ink-muted": "#5F5850",
        line: "#D8DBD1",
      },
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        serif: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
