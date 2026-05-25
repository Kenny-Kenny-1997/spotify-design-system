// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SPOTIFY DESIGN SYSTEM — Design Tokens
// Single source of truth for all design decisions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const tokens = {
  // ─── Color Palette ───
  color: {
    // Brand
    green: {
      DEFAULT: "#1DB954",
      light: "#1ED760",
      dark: "#158A3E",
      subtle: "rgba(29, 185, 84, 0.12)",
      glow: "rgba(29, 185, 84, 0.3)",
    },

    // Neutrals
    black: "#000000",
    darkest: "#0A0A0A",
    darker: "#121212",
    dark: "#181818",
    medium: "#242424",
    light: "#2A2A2A",

    white: "#FFFFFF",
    grey: {
      100: "#F8F8F8",
      200: "#E8E8E8",
      300: "#D1D1D1",
      400: "#A8A8A8",
      500: "#8A8A8A",
      600: "#6A6A6A",
      700: "#545454",
      800: "#3A3A3A",
      900: "#2A2A2A",
    },

    // Semantic
    positive: "#1DB954",
    negative: "#E91429",
    warning: "#E8A201",
    info: "#0D72EA",
  },

  // ─── Typography ───
  typography: {
    fontFamily: {
      primary: "'DM Sans', sans-serif",
      display: "'Syne', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    fontSize: {
      "3xs": "0.625rem",   // 10px
      "2xs": "0.6875rem",  // 11px
      xs: "0.75rem",       // 12px
      sm: "0.8125rem",     // 13px
      base: "0.9375rem",   // 15px
      md: "1rem",          // 16px
      lg: "1.125rem",      // 18px
      xl: "1.25rem",       // 20px
      "2xl": "1.5rem",     // 24px
      "3xl": "1.75rem",    // 28px
      "4xl": "2.25rem",    // 36px
      "5xl": "3rem",       // 48px
      "6xl": "4rem",       // 64px
    },
  },

  // ─── Spacing ───
  spacing: {
    px: "1px",
    0: "0",
    1: "0.25rem",   // 4px
    2: "0.5rem",    // 8px
    3: "0.75rem",   // 12px
    4: "1rem",      // 16px
    5: "1.25rem",   // 20px
    6: "1.5rem",    // 24px
    8: "2rem",      // 32px
    10: "2.5rem",   // 40px
    12: "3rem",     // 48px
    16: "4rem",     // 64px
    20: "5rem",     // 80px
    24: "6rem",     // 96px
  },

  // ─── Border Radius ───
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },

  // ─── Shadows ───
  shadow: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.4)",
    md: "0 4px 16px rgba(0, 0, 0, 0.5)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.5)",
    xl: "0 16px 40px rgba(0, 0, 0, 0.6)",
    glow: "0 0 40px rgba(29, 185, 84, 0.3)",
    "glow-lg": "0 0 80px rgba(29, 185, 84, 0.4)",
    "player": "0 -2px 20px rgba(0, 0, 0, 0.5)",
  },

  // ─── Animation ───
  animation: {
    duration: {
      instant: "100ms",
      fast: "150ms",
      normal: "250ms",
      slow: "400ms",
      slower: "600ms",
    },
    easing: {
      spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      linear: "linear",
    },
  },

  // ─── Layout ───
  layout: {
    sidebarWidth: "280px",
    sidebarCollapsed: "72px",
    playerHeight: "90px",
    topbarHeight: "64px",
    maxContentWidth: "1800px",
    contentPadding: "24px",
  },

  // ─── Z-Index Scale ───
  zIndex: {
    base: 0,
    raised: 10,
    dropdown: 50,
    sticky: 100,
    sidebar: 100,
    player: 200,
    modal: 300,
    toast: 400,
    tooltip: 500,
  },
} as const;

export type Tokens = typeof tokens;
export type ColorToken = keyof typeof tokens.color;
export type SpacingToken = keyof typeof tokens.spacing;
