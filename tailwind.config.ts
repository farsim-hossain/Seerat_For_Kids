import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desert: {
          50: "#fdf8ee",
          100: "#f9eecd",
          200: "#f3db98",
          300: "#ecc460",
          400: "#e5ad33",
          500: "#cf8e1c",
          600: "#b26d15",
          700: "#8e4e14",
          800: "#743f16",
          900: "#613516",
        },
        oasis: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          700: "#047857",
          900: "#064e3b",
        },
        night: {
          800: "#111827",
          900: "#0b0f19",
          950: "#05070c",
        }
      },
      fontFamily: {
        arabic: ['"Amiri"', 'serif'],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
