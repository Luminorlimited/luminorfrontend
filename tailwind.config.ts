import type { Config } from "tailwindcss";
import tailwindconfig from 'tailwindcss-animate'

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ["var(--font-open-sans)", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "576px",
          md: "768px",
          lg: "992px",
          xl: "1140px",
          "2xl": "1320px",
        },
      },
      colors: {
        bg_primary: '#5633D1',
        primary: {
          DEFAULT: "#5633D1",
          light: "#8B6FE3",
        },
        icon: {
          primary: '#74C5FF',
        },
        secondary: {
          DEFAULT: "#FFC06B",
          light: "#FFD7A1",
        },
        gradieant: {
          DEFAULT: "#FFC06B66",
          light: "#FF78AF66",
          dark: "#74C5FF66",
        },
        textColor: {
          primary: "#1D1F2C",
          secondary: "#4A4C56",
          smallText: "#D2D2D5",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindconfig],
} satisfies Config;
