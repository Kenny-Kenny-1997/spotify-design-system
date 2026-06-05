"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { usePlayerContext } from "@/lib/player-context";
import { Track, Playlist } from "@/lib/data";

interface MusicCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  tracks?: Track[];
  playlist?: Playlist;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  badge?: string;
}

export default function MusicCard({
  title,
  subtitle,
  imageUrl,
  tracks = [],
  playlist,
  onClick,
  size = "md",
  rounded = false,
  badge,
}: MusicCardProps) {
  const { state, play, togglePlayPause } = usePlayerContext();
  const [hovered, setHovered] = useState(false);

  const queueTracks = playlist ? playlist.tracks : tracks;
  const isCurrentPlaylist = queueTracks.length > 0 && state.currentTrack &&
    queueTracks.some(t => t.id === state.currentTrack?.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentPlaylist) {
      togglePlayPause();
    } else if (queueTracks.length > 0) {
      play(queueTracks[0], queueTracks);
    }
  };

  return (
    <div
      className={cn("card-interactive group cursor-pointer select-none animate-fade-in")}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover Image */}
      <div className="relative mb-4">
        <div className={cn("relative overflow-hidden", rounded ? "rounded-full" : "rounded-md")}>
          <img
            src={imageUrl}
            alt={title}
            className={cn(
              "w-full aspect-square object-cover transition-all duration-500",
              hovered && "scale-105"
            )}
            loading="lazy"
          />
          {isCurrentPlaylist && state.isPlaying && (
            <div className="absolute bottom-3 left-3 flex items-end gap-[2px] h-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="equalizer-bar"
                  style={{ height: `${[60, 100, 40, 80][i]}%`, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {queueTracks.length > 0 && (
          <button
            onClick={handlePlay}
            className={cn(
              "absolute bottom-3 right-3 flex items-center justify-center",
              "w-10 h-10 rounded-full bg-spotify-green shadow-glow",
              "transition-all duration-250",
              hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              "hover:scale-105 hover:bg-spotify-green-light active:scale-95"
            )}
          >
            {isCurrentPlaylist && state.isPlaying ? (
              <PauseIcon className="w-4 h-4 text-black" />
            ) : (
              <PlayIcon className="w-4 h-4 text-black ml-0.5" />
            )}
          </button>
        )}

        {badge && (
          <div className="absolute top-2 left-2 badge-new text-xs px-2 py-0.5 rounded-full font-bold">
            {badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="font-bold text-body-sm text-[var(--color-text-primary)] truncate mb-1">{title}</p>
        <p className="text-body-sm text-[var(--color-text-secondary)] truncate-2 leading-snug">{subtitle}</p>
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
