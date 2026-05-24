# 🎵 Spotify Design System

A production-grade Spotify-inspired music platform design system built with **Next.js 14**, **Tailwind CSS**, **CSS Modules**, and **TypeScript**.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 🏗️ Project Architecture

```
spotify-design-system/
├── src/
│   ├── app/
│   │   ├── globals.css        # Design tokens, base styles, component layer
│   │   ├── layout.tsx         # Root layout with ThemeProvider + PlayerProvider
│   │   └── page.tsx           # Entry point
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx  # Main shell: sidebar + content + player
│   │   │   ├── Sidebar.tsx    # Navigation + library
│   │   │   ├── TopBar.tsx     # Nav controls + theme switcher
│   │   │   ├── HomeView.tsx   # Home feed
│   │   │   └── SearchView.tsx # Search + genre browse
│   │   ├── player/
│   │   │   ├── PlayerBar.tsx       # Full-featured audio player
│   │   │   └── PlayerBar.module.css # CSS Modules for complex styles
│   │   ├── playlist/
│   │   │   ├── PlaylistView.tsx    # Playlist detail page
│   │   │   └── TrackRow.tsx        # Individual track row
│   │   └── ui/
│   │       └── MusicCard.tsx       # Reusable card component
│   ├── hooks/
│   │   └── usePlayer.ts       # Player state logic
│   └── lib/
│       ├── tokens.ts          # Design tokens (single source of truth)
│       ├── theme.tsx          # Theme context + useTheme hook
│       ├── player-context.tsx # Player context provider
│       ├── data.ts            # Mock data + helpers
│       └── utils.ts           # cn() utility
├── tailwind.config.ts         # Extended Tailwind theme
├── postcss.config.js          # PostCSS + Autoprefixer
└── tsconfig.json
```

## 🎨 Styling Architecture

### Three-Layer Approach

| Layer | Tool | When to Use |
|-------|------|-------------|
| Design Tokens | `src/lib/tokens.ts` + CSS Variables | Colors, spacing, typography scales |
| Utility Classes | Tailwind CSS | Layout, spacing, responsive design |
| Scoped Styles | CSS Modules | Complex selectors, animations, browser quirks |

### Design Tokens

All design decisions flow from `src/lib/tokens.ts`:

```ts
import { tokens } from "@/lib/tokens";
// tokens.color.green.DEFAULT → "#1DB954"
// tokens.animation.duration.normal → "250ms"
```

CSS variables (defined in `globals.css`) make tokens available to all layers:

```css
:root {
  --color-brand: #1DB954;
  --sidebar-width: 280px;
  --player-height: 90px;
}
```

### Tailwind Configuration

Extended with Spotify's design language:

```ts
// tailwind.config.ts
colors: {
  spotify: { green: "#1DB954", "green-light": "#1ED760", ... }
}
animation: {
  equalizer: "equalizer 1.2s ease-in-out infinite",
  shimmer: "shimmer 1.5s infinite",
  float: "float 6s ease-in-out infinite",
}
```

### CSS Modules Integration

Used alongside Tailwind for complex cases:

```tsx
// Complex pseudo-elements
import styles from "./PlayerBar.module.css";

// Use alongside Tailwind utilities
<div className={cn("flex items-center", styles.trackRow)}>
```

## 🌓 Theme System

Three themes available:
- **Dark** (default) — Spotify's signature dark UI
- **Light** — Clean white mode
- **High Contrast** — Accessibility-first variant

```tsx
import { useTheme } from "@/lib/theme";
const { theme, setTheme, toggleTheme } = useTheme();
```

Theme preferences persist to `localStorage` and respect `prefers-color-scheme`.

## 🎵 Player Architecture

The player uses React Context + custom hook pattern:

```tsx
import { usePlayerContext } from "@/lib/player-context";
const { state, play, togglePlayPause, seek, setVolume } = usePlayerContext();
```

Features:
- Play/pause with progress simulation
- Skip next/previous
- Shuffle & repeat modes (off / all / one)
- Volume control + mute
- Queue management

## ♿ Accessibility

- **Focus visible** styles on all interactive elements
- **`prefers-reduced-motion`** respected (`reduceMotion` state)
- **Keyboard navigable** controls
- **High contrast** theme option
- **Semantic HTML** (`<nav>`, `<header>`, `<main>`, `<footer>`)
- **ARIA** attributes on icon-only buttons

## 📦 Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Next.js | 14.2 | React framework + routing |
| React | 18.3 | UI library |
| TypeScript | 5.4 | Type safety |
| Tailwind CSS | 3.4 | Utility-first CSS |
| CSS Modules | built-in | Scoped component styles |
| PostCSS | 8.4 | CSS processing |
| Autoprefixer | 10.4 | Vendor prefix automation |
| clsx + tailwind-merge | latest | Class composition |

## 🔧 Configuration Files

- `tailwind.config.ts` — Custom design tokens, animations, grid templates
- `postcss.config.js` — Tailwind + Autoprefixer pipeline
- `tsconfig.json` — TypeScript with path aliases (`@/*`)
- `next.config.mjs` — Image domains, build optimization
