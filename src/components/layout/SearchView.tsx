"use client";

import React, { useState } from "react";
import { PLAYLISTS, ARTISTS, TRACKS, formatFollowers } from "@/lib/data";
import MusicCard from "@/components/ui/MusicCard";
import { usePlayerContext } from "@/lib/player-context";

const GENRES = [
  { name: "Pop", bg: "#E61E32" },
  { name: "Hip-Hop", bg: "#BA5D07" },
  { name: "R&B", bg: "#1E3264" },
  { name: "Latin", bg: "#E8115B" },
  { name: "Rock", bg: "#8D67AB" },
  { name: "Dance/Electronic", bg: "#0D73EC" },
  { name: "Podcasts", bg: "#148A08" },
  { name: "Mood", bg: "#E91429" },
  { name: "Jazz", bg: "#1E3264" },
  { name: "Metal", bg: "#503750" },
  { name: "Indie", bg: "#E61E32" },
  { name: "Classical", bg: "#BA5D07" },
];

export default function SearchView() {
  const [query, setQuery] = useState("");
  const { play } = usePlayerContext();

  const filteredTracks = query.length > 1
    ? TRACKS.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredPlaylists = query.length > 1
    ? PLAYLISTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredArtists = query.length > 1
    ? ARTISTS.filter(a => a.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="px-6 pb-8 page-enter">
      {/* Search Input */}
      <div className="sticky top-0 pt-6 pb-4 bg-[var(--color-surface)] z-10">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-subdued)]" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="What do you want to play?"
            className="w-full pl-12 pr-4 py-3 rounded-full text-body-md font-medium
              bg-white text-black placeholder-gray-400
              outline-none focus:ring-2 focus:ring-spotify-green
              transition-all duration-200"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {query.length > 1 ? (
        <div className="space-y-8 animate-fade-in">
          {/* Tracks */}
          {filteredTracks.length > 0 && (
            <section>
              <h2 className="text-display-sm font-bold mb-4">Songs</h2>
              <div className="space-y-1">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => play(track, filteredTracks)}
                    className="flex items-center gap-4 p-3 rounded-md hover:bg-[var(--color-surface-hover)] cursor-pointer"
                  >
                    <img src={track.coverUrl} alt="" className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="text-body-sm font-semibold text-[var(--color-text-primary)]">{track.title}</p>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">{track.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {filteredArtists.length > 0 && (
            <section>
              <h2 className="text-display-sm font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-cards-sm gap-4">
                {filteredArtists.map(artist => (
                  <MusicCard
                    key={artist.id}
                    title={artist.name}
                    subtitle={formatFollowers(artist.monthlyListeners) + " monthly listeners"}
                    imageUrl={artist.imageUrl}
                    rounded
                  />
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <section>
              <h2 className="text-display-sm font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-cards-sm gap-4">
                {filteredPlaylists.map(pl => (
                  <MusicCard
                    key={pl.id}
                    title={pl.name}
                    subtitle={pl.description || "Playlist"}
                    imageUrl={pl.coverUrl}
                    tracks={pl.tracks}
                  />
                ))}
              </div>
            </section>
          )}

          {filteredTracks.length === 0 && filteredArtists.length === 0 && filteredPlaylists.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-text-subdued)] text-body-lg">No results found for &quot;{query}&quot;</p>
              <p className="text-[var(--color-text-subdued)] text-body-sm mt-2">Check your spelling or try different keywords.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <h2 className="text-display-sm font-bold">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {GENRES.map(genre => (
              <button
                key={genre.name}
                className="relative rounded-card overflow-hidden h-24 text-left p-4 group
                  hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: genre.bg }}
              >
                <span className="font-bold text-white text-body-md leading-tight">{genre.name}</span>
                <div
                  className="absolute -bottom-3 -right-3 w-16 h-16 rounded-lg opacity-80
                    group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(0,0,0,0.2)", transform: "rotate(25deg)" }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
