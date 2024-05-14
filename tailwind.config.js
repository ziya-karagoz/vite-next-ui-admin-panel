/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const primary = {
  50: "#fdf2f8",
  100: "#fce7f3",
  200: "#fbcfe8",
  300: "#f9a8d4",
  400: "#f472b6",
  500: "#ec4899",
  600: "#db2777",
  700: "#be185d",
  800: "#9d174d",
  900: "#831843",
  950: "#500724",
};


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 800ms ease-in-out infinite',
      },
    },
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
