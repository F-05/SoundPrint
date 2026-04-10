import { spotifyFetch } from "./client";

export function getRecentlyPlayed(limit = 50) {
    return spotifyFetch(`me/player/recently-played?limit=${limit}`);
}