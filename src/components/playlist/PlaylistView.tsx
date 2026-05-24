"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Playlist, formatFollowers, formatDuration } from "@/lib/data";
import { usePlayerContext } from "@/lib/player-context";
import TrackRow from "@/components/playlist/TrackRow";

interface PlaylistViewProps {
  playlist: Playlist;
}

export default function PlaylistView({ playlist }: PlaylistViewProps) {
  const { state, play, togglePlayPause } = usePlayerContext();
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isThisPlaylist = state.queue.length > 0 && playlist.tracks.some(t => t.id === state.currentTrack?.id);
  const isPlaying = isThisPlaylist && state.isPlaying;

  const totalDuration = playlist.tracks.reduce((acc, t) => acc + t.duration, 0);

  const handlePlayPause = () => {
    if (isThisPlaylist) togglePlayPause();
    else play(playlist.tracks[0], playlist.tracks);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 100);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);

  const headerHeight = 280;

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto page-enter">
      {/* Hero Header */}
      <div
        className="relative flex items-end gap-6 px-6 pb-6 pt-20"
        style={{
          minHeight: headerHeight,
          background: `linear-gradient(transparent 0%, rgba(80,80,80,0.8) 30%, rgba(40,40,40,0.95) 100%)`,
        }}
      >
        {/* Background album art blur */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${playlist.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "blur(60px) saturate(1.5)",
            opacity: 0.4,
          }}
        />

        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="relative z-10 w-48 h-48 shadow-card rounded-md object-cover flex-shrink-0"
        />

        <div className="relative z-10 flex flex-col gap-2 pb-1">
          <span className="text-label font-bold uppercase tracking-widest text-white/80">Playlist</span>
          <h1 className="text-display-lg font-bold text-white leading-none">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-[var(--color-text-secondary)] text-body-md">{playlist.description}</p>
          )}
          <div className="flex items-center gap-1 text-body-sm text-[var(--color-text-secondary)] mt-1">
            <span className="font-bold text-white">{playlist.owner}</span>
            {playlist.followers ? (
              <>
                <span>·</span>
                <span>{formatFollowers(playlist.followers)} likes</span>
              </>
            ) : null}
            <span>·</span>
            <span>{playlist.tracks.length} songs,</span>
            <span>{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div
        className={cn(
          "flex items-center gap-6 px-6 py-5 transition-all duration-300",
          "bg-gradient-to-b from-[rgba(40,40,40,0.95)] to-[var(--color-surface)]"
        )}
      >
        <button
          onClick={handlePlayPause}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-spotify-green
            hover:scale-105 active:scale-95 transition-all duration-150 shadow-glow"
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 text-black" />
          ) : (
            <PlayIcon className="w-6 h-6 text-black ml-1" />
          )}
        </button>

        <button className="text-[var(--color-text-secondary)] hover:text-white transition-colors">
          <HeartIcon className="w-8 h-8" />
        </button>

        <button className="text-[var(--color-text-secondary)] hover:text-white transition-colors ml-auto">
          <DotsIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Table Header */}
      <div className="px-6 mb-2">
        <div
          className="grid items-center gap-4 px-4 py-2 border-b border-[var(--color-border)]
            text-label text-[var(--color-text-subdued)] font-semibold uppercase tracking-wider"
          style={{ gridTemplateColumns: "16px 4fr 3fr 1fr auto" }}
        >
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span className="text-right">Plays</span>
          <span className="text-right">
            <ClockIcon className="w-4 h-4 inline" />
          </span>
        </div>
      </div>

      {/* Track List */}
      <div className="px-6 pb-8 space-y-1">
        {playlist.tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i}
            queue={playlist.tracks}
            showAlbum
            showPlays
          />
        ))}
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
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
);
const DotsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
);
