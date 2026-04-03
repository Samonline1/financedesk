/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        base: {
          50: "#f2f3f5",
          100: "#e6e7ea",
          700: "#1d1f27",
          900: "#0d0f14",
        },
        accent: {
          green: "#c8ff45",
          purple: "#6f5bff",
          blue: "#4b5cff",
        },
        ink: {
          50: "#f9fafb",
          200: "#e5e7eb",
          400: "#9ca3af",
          600: "#4b5563",
          800: "#1f2937",
          900: "#111827",
        },
      },
      boxShadow: {
        card: "0 10px 40px -18px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
