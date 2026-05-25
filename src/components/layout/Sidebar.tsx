"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PLAYLISTS } from "@/lib/data";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "search", label: "Search", icon: SearchIcon },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const [libraryExpanded, setLibraryExpanded] = useState(true);

  return (
    <aside className="flex flex-col gap-2 h-full w-full overflow-hidden">
      {/* Main Nav */}
      <nav
        className="flex flex-col gap-1 rounded-card-lg px-3 py-5"
        style={{ background: "var(--color-surface-raised)" }}
      >
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center gap-4 px-3 py-2.5 rounded-md transition-all duration-150 text-left group",
                activeView === item.id
                  ? "text-white font-bold"
                  : "text-[var(--color-text-secondary)] hover:text-white font-semibold"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 flex-shrink-0 transition-transform duration-150",
                  "group-hover:scale-110"
                )}
                filled={activeView === item.id}
              />
              <span className="text-body-md">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Library */}
      <div
        className="flex flex-col flex-1 rounded-card-lg overflow-hidden"
        style={{ background: "var(--color-surface-raised)" }}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => setLibraryExpanded(v => !v)}
            className="flex items-center gap-3 text-[var(--color-text-secondary)] hover:text-white transition-colors group"
          >
            <LibraryIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-body-md">Your Library</span>
          </button>
          <div className="flex items-center gap-1">
            <button className="btn-icon">
              <PlusIcon className="w-4 h-4" />
            </button>
            <button className="btn-icon">
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {["Playlists", "Artists", "Albums"].map(f => (
            <button
              key={f}
              className="flex-shrink-0 px-3 py-1 rounded-full text-body-sm font-semibold
                bg-[var(--color-surface-overlay)] text-[var(--color-text-primary)]
                hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Playlist List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {PLAYLISTS.map((pl, i) => (
            <button
              key={pl.id}
              onClick={() => onNavigate(`playlist-${pl.id}`)}
              className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-md transition-colors duration-150",
                "hover:bg-[var(--color-surface-hover)] group",
                activeView === `playlist-${pl.id}` && "bg-[var(--color-surface-overlay)]"
              )}
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <img
                  src={pl.coverUrl}
                  alt={pl.name}
                  className="w-full h-full object-cover rounded-sm shadow-md"
                  loading="lazy"
                />
                {i === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayIcon className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start overflow-hidden min-w-0">
                <span className="text-body-sm font-semibold text-[var(--color-text-primary)] truncate w-full">
                  {pl.name}
                </span>
                <span className="text-body-sm text-[var(--color-text-secondary)] truncate w-full">
                  Playlist · {pl.owner}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Icon Components ───
function HomeIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} strokeWidth={2}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" strokeLinecap="round" fill="none" stroke="currentColor" strokeWidth={filled ? 1.5 : 2} />
    </svg>
  );
}

function SearchIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}

function LibraryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M3 6h18M3 12h18M3 18h18" />
      <rect x="3" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" opacity="0.4" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}
