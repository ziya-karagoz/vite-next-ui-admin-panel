/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const primary = {
  50: "#DDF4FF",
  100: "#B6E3FF",
  200: "#80CCFF",
  300: "#54AEFF",
  400: "#218BFF",
  500: "#0969DA",
  600: "#0550AE",
  700: "#033D8B",
  800: "#0A3069",
  900: "#002155",
};


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              ...primary,
              DEFAULT: primary[700],
              foreground: "#ffffff",
            },
            focus: primary[700],
          },
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "2px",
            },
            radius: {
              medium: "0.5rem",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              ...primary,
              DEFAULT: primary[500],
              foreground: "#ffffff",
            },
            focus: primary[500],
          },
          layout: {
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "2px",
            },
            radius: {
              medium: "0.5rem",
            },
          },
        },
      },
    }),
  ],
};
