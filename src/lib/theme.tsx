"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "high-contrast";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("spotify-theme") as Theme | null;
    const savedMotion = localStorage.getItem("spotify-reduce-motion");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (saved) setThemeState(saved);
    else setThemeState(systemPrefersDark ? "dark" : "light");

    if (savedMotion !== null) setReduceMotion(savedMotion === "true");
    else setReduceMotion(systemReduceMotion);

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("dark", "light", "high-contrast");
    root.classList.add(theme);
    localStorage.setItem("spotify-theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (reduceMotion) root.classList.add("reduce-motion");
    else root.classList.remove("reduce-motion");
    localStorage.setItem("spotify-reduce-motion", String(reduceMotion));
  }, [reduceMotion, mounted]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => setThemeState(t => t === "dark" ? "light" : "dark");

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, reduceMotion, setReduceMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
