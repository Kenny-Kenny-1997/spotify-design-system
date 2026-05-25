"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

interface TopBarProps {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onBack?: () => void;
  onForward?: () => void;
  scrolled?: boolean;
}

export default function TopBar({ canGoBack, canGoForward, onBack, onForward, scrolled }: TopBarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header
      className={cn(
        "flex items-center justify-between px-6 py-4 transition-all duration-300",
        "sticky top-0 z-[100]",
        scrolled ? "bg-blur-overlay border-b border-[var(--color-border)]" : "bg-transparent"
      )}
      style={{ height: "var(--topbar-height)" }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full bg-black/40 transition-all duration-150",
            canGoBack ? "hover:bg-black/60 cursor-pointer" : "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeftIcon className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onForward}
          disabled={!canGoForward}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full bg-black/40 transition-all duration-150",
            canGoForward ? "hover:bg-black/60 cursor-pointer" : "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRightIcon className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-black/40 rounded-full p-1">
          {(["dark", "light", "high-contrast"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "px-3 py-1 rounded-full text-label transition-all duration-200",
                theme === t
                  ? "bg-white text-black font-bold"
                  : "text-[var(--color-text-secondary)] hover:text-white"
              )}
            >
              {t === "dark" ? "🌙" : t === "light" ? "☀️" : "⬛"}
            </button>
          ))}
        </div>

        <button className="btn-secondary text-label hidden sm:flex">
          Install App
        </button>

        <button className="btn-icon relative">
          <BellIcon className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-spotify-green" />
        </button>

        <button className="flex items-center gap-2 bg-black/40 hover:bg-black/60 rounded-full p-1 pr-3 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-spotify-green to-emerald-600 flex items-center justify-center">
            <span className="text-xs font-bold text-black">U</span>
          </div>
          <span className="text-body-sm font-semibold text-white hidden sm:block">User</span>
          <ChevronDownIcon className="w-3 h-3 text-white" />
        </button>
      </div>
    </header>
  );
}

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
);
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
);
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
);
const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
);
