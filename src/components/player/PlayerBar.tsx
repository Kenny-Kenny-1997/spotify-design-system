"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePlayerContext } from "@/lib/player-context";
import { formatDuration } from "@/lib/data";

export default function PlayerBar() {
  const { state, togglePlayPause, seek, setVolume, toggleMute, toggleShuffle, cycleRepeat, skipNext, skipPrev } = usePlayerContext();
  const { currentTrack, isPlaying, progress, volume, isMuted, isShuffled, repeatMode } = state;

  const currentSecs = currentTrack ? Math.round((progress / 100) * currentTrack.duration) : 0;
  const totalSecs = currentTrack?.duration || 0;

  return (
    <footer
      className="flex items-center justify-between px-4 border-t border-[var(--color-border)]"
      style={{
        height: "var(--player-height)",
        background: "var(--color-surface-raised)",
        boxShadow: "var(--shadow-player, 0 -2px 20px rgba(0,0,0,0.5))",
      }}
    >
      {/* Left: Track Info */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        {currentTrack ? (
          <>
            <div className="relative group flex-shrink-0">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-14 h-14 rounded object-cover shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                <MaximizeIcon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-body-sm font-semibold text-white truncate">{currentTrack.title}</p>
              <p className="text-body-sm text-[var(--color-text-secondary)] truncate">{currentTrack.artist}</p>
            </div>
            <button className="btn-icon flex-shrink-0 ml-1">
              <HeartIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="text-[var(--color-text-subdued)] text-body-sm">Nothing playing</div>
        )}
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center gap-2 w-[40%] max-w-[600px]">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleShuffle}
            className={cn(
              "btn-icon transition-colors",
              isShuffled ? "text-spotify-green" : "text-[var(--color-text-secondary)]"
            )}
            title="Shuffle"
          >
            <ShuffleIcon className="w-4 h-4" />
            {isShuffled && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-spotify-green" />}
          </button>

          <button onClick={skipPrev} className="btn-icon text-[var(--color-text-secondary)] hover:text-white">
            <SkipBackIcon className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150",
              "bg-white hover:scale-105 active:scale-95 hover:bg-gray-100",
              !currentTrack && "opacity-50 cursor-not-allowed"
            )}
            disabled={!currentTrack}
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 text-black" />
            ) : (
              <PlayIcon className="w-4 h-4 text-black ml-0.5" />
            )}
          </button>

          <button onClick={skipNext} className="btn-icon text-[var(--color-text-secondary)] hover:text-white">
            <SkipForwardIcon className="w-4 h-4" />
          </button>

          <button
            onClick={cycleRepeat}
            className={cn(
              "btn-icon relative transition-colors",
              repeatMode !== "off" ? "text-spotify-green" : "text-[var(--color-text-secondary)]"
            )}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === "one" ? <RepeatOneIcon className="w-4 h-4" /> : <RepeatIcon className="w-4 h-4" />}
            {repeatMode !== "off" && (
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-spotify-green" />
            )}
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-label text-[var(--color-text-subdued)] tabular-nums w-10 text-right">
            {formatDuration(currentSecs)}
          </span>
          <div className="flex-1 group relative">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={e => seek(Number(e.target.value))}
              className="range-input"
              style={{ "--value": `${progress}%` } as React.CSSProperties}
            />
          </div>
          <span className="text-label text-[var(--color-text-subdued)] tabular-nums w-10">
            {formatDuration(totalSecs)}
          </span>
        </div>
      </div>

      {/* Right: Volume + extra */}
      <div className="flex items-center justify-end gap-2 w-[30%]">
        <button className="btn-icon text-[var(--color-text-secondary)]">
          <QueueIcon className="w-4 h-4" />
        </button>
        <button className="btn-icon text-[var(--color-text-secondary)]">
          <DeviceIcon className="w-4 h-4" />
        </button>

        <button
          onClick={toggleMute}
          className="btn-icon text-[var(--color-text-secondary)] hover:text-white"
        >
          {isMuted || volume === 0 ? (
            <VolumeMuteIcon className="w-4 h-4" />
          ) : volume < 40 ? (
            <VolumeLowIcon className="w-4 h-4" />
          ) : (
            <VolumeHighIcon className="w-4 h-4" />
          )}
        </button>

        <div className="w-24">
          <input
            type="range"
            min={0}
            max={100}
            value={isMuted ? 0 : volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="range-input"
            style={{ "--value": `${isMuted ? 0 : volume}%` } as React.CSSProperties}
          />
        </div>

        <button className="btn-icon text-[var(--color-text-secondary)]">
          <FullscreenIcon className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}

// Icons
const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
);
const PauseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
);
const SkipBackIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="2" height="16" rx="1"/></svg>
);
const SkipForwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,4 15,12 5,20"/><rect x="17" y="4" width="2" height="16" rx="1"/></svg>
);
const ShuffleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M16 3h5v5M4 20l16-16M16 21h5v-5M4 4l5 5"/></svg>
);
const RepeatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
);
const RepeatOneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/><text x="12" y="14" fontSize="6" fill="currentColor" stroke="none" textAnchor="middle">1</text></svg>
);
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
);
const MaximizeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
);
const QueueIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
const DeviceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
);
const VolumeHighIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
);
const VolumeLowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
);
const VolumeMuteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
);
const FullscreenIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
);
