import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { PlayerProvider } from "@/lib/player-context";

export const metadata: Metadata = {
  title: "Spotify Design System",
  description: "A Spotify-inspired music platform design system built with Next.js, Tailwind CSS, and CSS Modules",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PlayerProvider>
            {children}
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
