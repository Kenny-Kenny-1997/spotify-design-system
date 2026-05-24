"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Track, formatDuration, formatPlays } from "@/lib/data";
import { usePlayerContext } from "@/lib/player-context";

interface TrackRowProps {
  track: Track;
  index: number;
  queue: Track[];
  showAlbum?: boolean;
  showPlays?: boolean;
}

export default function TrackRow({ track, index, queue, showAlbum = true, showPlays = false }: TrackRowProps) {
  const { state, play, togglePlayPause } = usePlayerContext();
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const isActive = state.currentTrack?.id === track.id;
  const isPlaying = isActive && state.isPlaying;

  const handleClick = () => {
    if (isActive) togglePlayPause();
    else play(track, queue);
  };

  return (
    <div
      className={cn(
        "grid items-center gap-4 px-4 py-2 rounded-md group transition-all duration-150",
        showAlbum ? "grid-cols-[16px_4fr_3fr_1fr_auto]" : "grid-cols-[16px_4fr_1fr_auto]",
        hovered && "bg-[var(--color-surface-hover)]",
        isActive && "bg-[var(--color-surface-overlay)]"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handleClick}
    >
      {/* Index / Play indicator */}
      <div className="flex items-center justify-center w-4">
        {hovered ? (
          <button onClick={handleClick} className="text-white hover:scale-110 transition-transform">
            {isPlaying ? (
              <PauseIcon className="w-4 h-4" />
            ) : (
              <PlayIcon className="w-3.5 h-3.5" />
            )}
          </button>
        ) : isPlaying ? (
          <div className="flex items-end gap-[2px] h-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-[2px] bg-spotify-green rounded-full origin-bottom"
                style={{
                  animation: `equalizer 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                  height: "100%",
                }}
              />
            ))}
          </div>
        ) : (
          <span className={cn("text-label tabular-nums", isActive ? "text-spotify-green" : "text-[var(--color-text-subdued)]")}>
            {index + 1}
          </span>
        )}
      </div>

      {/* Title + Artist */}
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={track.coverUrl}
          alt={track.title}
          className="w-10 h-10 rounded object-cover flex-shrink-0 shadow-sm"
          loading="lazy"
        />
        <div className="overflow-hidden min-w-0">
          <p className={cn(
            "text-body-sm font-semibold truncate",
            isActive ? "text-spotify-green" : "text-[var(--color-text-primary)]"
          )}>
            {track.title}
            {track.explicit && (
              <span className="ml-1.5 badge text-[10px] px-1 py-0 bg-[var(--color-surface-overlay)] text-[var(--color-text-secondary)] rounded-sm align-middle">E</span>
            )}
          </p>
          <p className="text-body-sm text-[var(--color-text-secondary)] truncate hover:underline cursor-pointer">
            {track.artist}
          </p>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <p className="text-body-sm text-[var(--color-text-secondary)] truncate hover:text-white hover:underline cursor-pointer">
          {track.album}
        </p>
      )}

      {/* Plays */}
      {showPlays && (
        <p className="text-body-sm text-[var(--color-text-secondary)] text-right tabular-nums">
          {formatPlays(track.plays)}
        </p>
      )}

      {/* Duration + Like */}
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={() => setLiked(v => !v)}
          className={cn(
            "transition-all duration-150",
            hovered || liked ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            liked ? "text-spotify-green" : "text-[var(--color-text-secondary)] hover:text-white"
          )}
        >
          <HeartIcon className="w-4 h-4" filled={liked} />
        </button>
        <span className="text-label text-[var(--color-text-secondary)] tabular-nums w-10 text-right">
          {formatDuration(track.duration)}
        </span>
      </div>
    </div>
  );
}

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
);
const PauseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
);
const HeartIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
);
