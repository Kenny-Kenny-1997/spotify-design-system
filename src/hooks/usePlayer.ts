"use client";

import { useState, useCallback, useRef } from "react";
import { Track } from "@/lib/data";

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0–100
  volume: number;   // 0–100
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  queue: Track[];
  queueIndex: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  volume: 70,
  isMuted: false,
  isShuffled: false,
  repeatMode: "off",
  queue: [],
  queueIndex: -1,
};

export function usePlayer() {
  const [state, setState] = useState<PlayerState>(initialState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startProgressInterval = useCallback(() => {
    clearProgressInterval();
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (!prev.isPlaying) return prev;
        const newProgress = prev.progress + (100 / (prev.currentTrack?.duration || 200));
        if (newProgress >= 100) {
          clearProgressInterval();
          // Auto next
          return { ...prev, progress: 0, isPlaying: false };
        }
        return { ...prev, progress: newProgress };
      });
    }, 1000);
  }, []);

  const play = useCallback((track: Track, queue?: Track[]) => {
    setState(prev => {
      const newQueue = queue || prev.queue;
      const idx = queue ? queue.findIndex(t => t.id === track.id) : prev.queueIndex;
      return {
        ...prev,
        currentTrack: track,
        isPlaying: true,
        progress: 0,
        queue: newQueue,
        queueIndex: idx,
      };
    });
    startProgressInterval();
  }, [startProgressInterval]);

  const togglePlayPause = useCallback(() => {
    setState(prev => {
      if (!prev.currentTrack) return prev;
      const next = !prev.isPlaying;
      if (next) startProgressInterval();
      else clearProgressInterval();
      return { ...prev, isPlaying: next };
    });
  }, [startProgressInterval]);

  const seek = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const cycleRepeat = useCallback(() => {
    setState(prev => {
      const modes: PlayerState["repeatMode"][] = ["off", "all", "one"];
      const idx = modes.indexOf(prev.repeatMode);
      return { ...prev, repeatMode: modes[(idx + 1) % modes.length] };
    });
  }, []);

  const skipNext = useCallback(() => {
    setState(prev => {
      if (!prev.queue.length) return prev;
      const nextIdx = (prev.queueIndex + 1) % prev.queue.length;
      return { ...prev, currentTrack: prev.queue[nextIdx], queueIndex: nextIdx, progress: 0, isPlaying: true };
    });
    startProgressInterval();
  }, [startProgressInterval]);

  const skipPrev = useCallback(() => {
    setState(prev => {
      if (prev.progress > 10) return { ...prev, progress: 0 };
      if (!prev.queue.length) return prev;
      const prevIdx = prev.queueIndex <= 0 ? prev.queue.length - 1 : prev.queueIndex - 1;
      return { ...prev, currentTrack: prev.queue[prevIdx], queueIndex: prevIdx, progress: 0, isPlaying: true };
    });
    startProgressInterval();
  }, [startProgressInterval]);

  return { state, play, togglePlayPause, seek, setVolume, toggleMute, toggleShuffle, cycleRepeat, skipNext, skipPrev };
}
