/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const primary = {
  50: "#eef2ff",
  100: "#e0e7ff",
  200: "#c7d2fe",
  300: "#a5b4fc",
  400: "#818cf8",
  500: "#6366f1",
  600: "#4f46e5",
  700: "#4338ca",
  800: "#3730a3",
  900: "#312e81",
  950: "#1e1b4b",
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
