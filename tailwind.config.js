/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      dark: {
        colors: {
          primary: {
            DEFAULT: "#e6210f",
            foreground: "#000000",
          },
          focus: "#b81a0c",
        },
      },
      light: {
        colors: {
          primary: {
            DEFAULT: "#e6210f",
            foreground: "#000000",
          },
          focus: "#b81a0c",
        },
      }
    },
  })]
}

