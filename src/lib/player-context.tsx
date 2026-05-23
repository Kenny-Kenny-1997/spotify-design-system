"use client";

import React, { createContext, useContext } from "react";
import { usePlayer, PlayerState } from "@/hooks/usePlayer";
import { Track } from "@/lib/data";

interface PlayerContextValue {
  state: PlayerState;
  play: (track: Track, queue?: Track[]) => void;
  togglePlayPause: () => void;
  seek: (progress: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  skipNext: () => void;
  skipPrev: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const player = usePlayer();
  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayerContext must be used inside PlayerProvider");
  return ctx;
}
