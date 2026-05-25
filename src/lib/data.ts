export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // seconds
  coverUrl: string;
  explicit?: boolean;
  plays?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl: string;
  tracks: Track[];
  owner: string;
  followers?: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genre: string;
  followers: number;
  monthlyListeners: number;
}

export const ARTISTS: Artist[] = [
  { id: "1", name: "The Weeknd", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", genre: "R&B/Soul", followers: 45200000, monthlyListeners: 82000000 },
  { id: "2", name: "Billie Eilish", imageUrl: "https://images.unsplash.com/photo-1571908599407-cdb918ed26c3?w=300&h=300&fit=crop", genre: "Pop", followers: 67100000, monthlyListeners: 64000000 },
  { id: "3", name: "Drake", imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=300&fit=crop", genre: "Hip-Hop", followers: 72300000, monthlyListeners: 58000000 },
  { id: "4", name: "Doja Cat", imageUrl: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=300&h=300&fit=crop", genre: "Pop/Rap", followers: 33400000, monthlyListeners: 55000000 },
  { id: "5", name: "SZA", imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop", genre: "R&B", followers: 19600000, monthlyListeners: 49000000 },
  { id: "6", name: "Bad Bunny", imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop", genre: "Reggaeton", followers: 43000000, monthlyListeners: 93000000 },
];

export const TRACKS: Track[] = [
  { id: "t1", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200, coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=60&h=60&fit=crop", plays: 3800000000 },
  { id: "t2", title: "As It Was", artist: "Harry Styles", album: "Harry's House", duration: 167, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop", plays: 2900000000 },
  { id: "t3", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: 238, coverUrl: "https://images.unsplash.com/photo-1571908599407-cdb918ed26c3?w=60&h=60&fit=crop", plays: 2600000000 },
  { id: "t4", title: "Stay", artist: "The Kid LAROI & Justin Bieber", album: "F*CK LOVE 3", duration: 141, coverUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=60&h=60&fit=crop", plays: 2400000000 },
  { id: "t5", title: "Bad Guy", artist: "Billie Eilish", album: "WHEN WE ALL FALL ASLEEP", duration: 194, coverUrl: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=60&h=60&fit=crop", plays: 2200000000, explicit: true },
  { id: "t6", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: 203, coverUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=60&h=60&fit=crop", plays: 2100000000 },
  { id: "t7", title: "Industry Baby", artist: "Lil Nas X & Jack Harlow", album: "MONTERO", duration: 212, coverUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=60&h=60&fit=crop", plays: 1900000000, explicit: true },
  { id: "t8", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: 174, coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop", plays: 2000000000 },
];

export const PLAYLISTS: Playlist[] = [
  {
    id: "p1",
    name: "Today's Top Hits",
    description: "The biggest hits right now",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    owner: "Spotify",
    followers: 33000000,
    tracks: TRACKS.slice(0, 5),
  },
  {
    id: "p2",
    name: "RapCaviar",
    description: "New music from Drake, Lil Baby, Roddy Ricch",
    coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    owner: "Spotify",
    followers: 15000000,
    tracks: TRACKS.slice(2, 7),
  },
  {
    id: "p3",
    name: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",
    owner: "Spotify",
    followers: 8500000,
    tracks: TRACKS.slice(1, 6),
  },
  {
    id: "p4",
    name: "Pop Rising",
    description: "The most exciting new pop acts",
    coverUrl: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=400&h=400&fit=crop",
    owner: "Spotify",
    followers: 6200000,
    tracks: TRACKS.slice(3, 8),
  },
  {
    id: "p5",
    name: "Liked Songs",
    description: "Your personal library of liked songs",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    owner: "You",
    followers: 0,
    tracks: TRACKS,
  },
];

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatPlays(plays?: number): string {
  if (!plays) return "—";
  if (plays >= 1_000_000_000) return `${(plays / 1_000_000_000).toFixed(1)}B`;
  if (plays >= 1_000_000) return `${(plays / 1_000_000).toFixed(0)}M`;
  return plays.toLocaleString();
}

export function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}
