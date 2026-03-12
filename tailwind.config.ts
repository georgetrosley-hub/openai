import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#111110",
          elevated: "#1B1A19",
          muted: "#252321",
          border: "#302D2A",
          divider: "#272523",
        },
        text: {
          primary: "#EDECE9",
          secondary: "#A8A29E",
          muted: "#6B6560",
          faint: "#4A4540",
        },
        accent: {
          DEFAULT: "#DA7756",
          muted: "#C06A4B",
          subtle: "#4A2F24",
          glow: "rgba(218, 119, 86, 0.12)",
        },
        claude: {
          coral: "#DA7756",
          "coral-light": "#E8917A",
          "coral-dark": "#B5614A",
          sand: "#D4C5B2",
          "sand-muted": "#A89B8C",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        tight: "-0.02em",
        relaxed: "0.01em",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        "glow-sm": "0 0 12px rgba(218, 119, 86, 0.08)",
        "glow-md": "0 0 24px rgba(218, 119, 86, 0.12)",
        "elevated": "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
