"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import PlayerBar from "@/components/player/PlayerBar";
import HomeView from "@/components/layout/HomeView";
import SearchView from "@/components/layout/SearchView";
import PlaylistView from "@/components/playlist/PlaylistView";
import { PLAYLISTS } from "@/lib/data";

export default function AppLayout() {
  const [view, setView] = useState("home");
  const [history, setHistory] = useState<string[]>(["home"]);
  const [histIdx, setHistIdx] = useState(0);

  const navigate = (to: string) => {
    const newHistory = [...history.slice(0, histIdx + 1), to];
    setHistory(newHistory);
    setHistIdx(newHistory.length - 1);
    setView(to);
  };

  const goBack = () => {
    if (histIdx <= 0) return;
    const prev = history[histIdx - 1];
    setHistIdx(h => h - 1);
    setView(prev);
  };

  const goForward = () => {
    if (histIdx >= history.length - 1) return;
    const next = history[histIdx + 1];
    setHistIdx(h => h + 1);
    setView(next);
  };

  const activePlaylist = view.startsWith("playlist-")
    ? PLAYLISTS.find(p => p.id === view.replace("playlist-", ""))
    : null;

  return (
    <div
      className="flex flex-col h-dvh overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Main Area: Sidebar + Content */}
      <div className="flex flex-1 gap-2 p-2 overflow-hidden min-h-0">
        {/* Sidebar */}
        <div
          className="flex-shrink-0 h-full overflow-hidden"
          style={{ width: "var(--sidebar-width)" }}
        >
          <Sidebar activeView={view} onNavigate={navigate} />
        </div>

        {/* Main Content */}
        <main
          className="flex-1 flex flex-col rounded-card-lg overflow-hidden relative"
          style={{ background: "var(--color-surface-raised)" }}
        >
          {/* TopBar - overlaid */}
          <div className="absolute top-0 left-0 right-0 z-[100]">
            <TopBar
              canGoBack={histIdx > 0}
              canGoForward={histIdx < history.length - 1}
              onBack={goBack}
              onForward={goForward}
            />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pt-16">
            {view === "home" && <HomeView onSelectPlaylist={id => navigate(`playlist-${id}`)} />}
            {view === "search" && <SearchView />}
            {activePlaylist && <PlaylistView playlist={activePlaylist} />}
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <PlayerBar />
    </div>
  );
}
