import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5", // Master primary
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          DEFAULT: "#4F46E5",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#8b5cf6",
          600: "#7c3aed", // Master secondary
          700: "#6d28d9",
          DEFAULT: "#7C3AED",
        },
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          500: "#06b6d4", // Master accent
          600: "#0891b2",
          DEFAULT: "#06B6D4",
        },
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
          DEFAULT: "#16A34A",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
          DEFAULT: "#F59E0B",
        },
        danger: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
          DEFAULT: "#DC2626",
        },
        background: "#F8FAFC",
        surface: "#FFFFFF",
        mainText: "#0F172A",
        subText: "#64748B",
        borderLine: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Inter", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        cardHover: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
        dropdown: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
