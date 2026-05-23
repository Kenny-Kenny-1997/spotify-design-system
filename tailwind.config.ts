import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Spotify Design Tokens
        spotify: {
          green: "#1DB954",
          "green-light": "#1ed760",
          "green-dark": "#158a3e",
          black: "#121212",
          "dark-base": "#181818",
          "dark-elevated": "#242424",
          "dark-press": "#000000",
          white: "#FFFFFF",
          "subdued": "#A7A7A7",
          "bright": "#FFFFFF",
          "positive": "#1DB954",
          "negative": "#E91429",
          "warning": "#E8A201",
          "announcement": "#0D72EA",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
          sunken: "var(--color-surface-sunken)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          subdued: "var(--color-text-subdued)",
          inverted: "var(--color-text-inverted)",
        },
      },
      fontFamily: {
        circular: ["'Circular Std'", "'DM Sans'", "sans-serif"],
        display: ["'Clash Display'", "'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["0.9375rem", { lineHeight: "1.5" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.4" }],
        "label": ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "sidebar": "var(--sidebar-width)",
        "player": "var(--player-height)",
      },
      borderRadius: {
        pill: "9999px",
        "card": "12px",
        "card-lg": "16px",
      },
      boxShadow: {
        "player": "0 -2px 20px rgba(0,0,0,0.5)",
        "card": "0 8px 24px rgba(0,0,0,0.5)",
        "card-hover": "0 16px 40px rgba(0,0,0,0.6)",
        "glow": "0 0 40px rgba(29,185,84,0.3)",
        "glow-lg": "0 0 80px rgba(29,185,84,0.4)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "slide-up": "slide-up 0.4s cubic-bezier(0.16,1,0.3,1)",
        "slide-down": "slide-down 0.4s cubic-bezier(0.16,1,0.3,1)",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16,1,0.3,1)",
        "equalizer": "equalizer 1.2s ease-in-out infinite",
        "wave": "wave 1.5s ease-in-out infinite",
        "shimmer": "shimmer 1.5s infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "slide-up": {
          from: { transform: "translateY(16px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          from: { transform: "translateY(-16px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.92)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "equalizer": {
          "0%, 100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        "wave": {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.4)" },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-green": "radial-gradient(at 40% 20%, rgba(29,185,84,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(29,185,84,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(29,185,84,0.15) 0px, transparent 50%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-out": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },
      zIndex: {
        "sidebar": "100",
        "player": "200",
        "modal": "300",
        "toast": "400",
        "tooltip": "500",
      },
      screens: {
        "xs": "480px",
        "3xl": "1920px",
      },
      gridTemplateColumns: {
        "app": "var(--sidebar-width) 1fr",
        "playlist": "auto 1fr",
        "cards-sm": "repeat(auto-fill, minmax(160px, 1fr))",
        "cards-md": "repeat(auto-fill, minmax(200px, 1fr))",
        "cards-lg": "repeat(auto-fill, minmax(240px, 1fr))",
      },
    },
  },
  plugins: [],
};

export default config;
