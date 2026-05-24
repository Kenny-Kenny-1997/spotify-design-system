"use client";

import React from "react";
import MusicCard from "@/components/ui/MusicCard";
import { PLAYLISTS, ARTISTS, TRACKS } from "@/lib/data";
import { formatFollowers } from "@/lib/data";

interface HomeViewProps {
  onSelectPlaylist: (id: string) => void;
}

const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

export default function HomeView({ onSelectPlaylist }: HomeViewProps) {
  return (
    <div className="px-6 pb-8 space-y-8 page-enter">
      {/* Quick Access Grid */}
      <section>
        <h2 className="text-display-sm font-bold mb-5">{greeting}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {PLAYLISTS.slice(0, 6).map(pl => (
            <button
              key={pl.id}
              onClick={() => onSelectPlaylist(pl.id)}
              className="flex items-center gap-4 rounded-md overflow-hidden group
                bg-[var(--color-surface-overlay)] hover:bg-[var(--color-surface-hover)]
                transition-all duration-200 pr-4"
            >
              <img
                src={pl.coverUrl}
                alt={pl.name}
                className="w-16 h-16 object-cover flex-shrink-0"
                loading="lazy"
              />
              <span className="font-bold text-body-sm text-[var(--color-text-primary)] text-left">
                {pl.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Playlist */}
      <section>
        <div
          className="relative rounded-card-lg overflow-hidden p-8 flex items-end"
          style={{
            minHeight: 280,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #1db954 100%)",
          }}
        >
          {/* BG decoration */}
          <div className="absolute inset-0 bg-mesh-green opacity-40" />
          <div
            className="absolute right-0 top-0 w-64 h-full opacity-20"
            style={{
              backgroundImage: `url(${PLAYLISTS[0].coverUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
            }}
          />

          <div className="relative z-10 max-w-lg">
            <span className="badge-new mb-3">PLAYLIST OF THE DAY</span>
            <h2 className="text-display-md font-bold text-white mb-2">{PLAYLISTS[0].name}</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">{PLAYLISTS[0].description}</p>
            <button
              onClick={() => onSelectPlaylist(PLAYLISTS[0].id)}
              className="btn-primary"
            >
              Play Now
            </button>
          </div>
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-display-sm font-bold">Recently played</h2>
          <button className="text-body-sm font-bold text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-cards-sm gap-4">
          {PLAYLISTS.map(pl => (
            <MusicCard
              key={pl.id}
              title={pl.name}
              subtitle={pl.description || `By ${pl.owner}`}
              imageUrl={pl.coverUrl}
              tracks={pl.tracks}
              onClick={() => onSelectPlaylist(pl.id)}
            />
          ))}
        </div>
      </section>

      {/* Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-display-sm font-bold">Popular artists</h2>
          <button className="text-body-sm font-bold text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-cards-sm gap-4">
          {ARTISTS.map(artist => (
            <MusicCard
              key={artist.id}
              title={artist.name}
              subtitle={`${formatFollowers(artist.monthlyListeners)} monthly listeners`}
              imageUrl={artist.imageUrl}
              rounded
              badge={artist.monthlyListeners > 80000000 ? "🔥 Hot" : undefined}
            />
          ))}
        </div>
      </section>

      {/* Featured Charts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-display-sm font-bold">Charts</h2>
          <button className="text-body-sm font-bold text-[var(--color-text-secondary)] hover:text-white transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-cards-sm gap-4">
          {PLAYLISTS.slice(0, 4).map((pl, i) => (
            <MusicCard
              key={pl.id + "-chart"}
              title={`#${i + 1} ${pl.name}`}
              subtitle="Updated daily"
              imageUrl={pl.coverUrl}
              tracks={pl.tracks}
              onClick={() => onSelectPlaylist(pl.id)}
              badge={i === 0 ? "New" : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
