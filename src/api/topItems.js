import { spotifyFetch } from "./client";

const VALID_TIME_RANGES = ['short_term', 'medium_term', 'long_term'];
const MAX_LIMIT = 50;

export function getTopTracks(timeRange = 'medium_term', limit = 20) {
    if (!VALID_TIME_RANGES.includes(timeRange)) {
        throw new Error(`Invalid time_range: ${timeRange}`);
    }

    const limit1 = Math.min(limit, MAX_LIMIT);
    return spotifyFetch(`me/top/tracks?time_range=${timeRange}&limit=${limit1}`);
}


export function getTopArtists(timeRange = 'medium_term', limit = 20) {
    if (!VALID_TIME_RANGES.includes(timeRange)) {
        throw new Error(`Invalid time_range: ${timeRange}`);
    }

    const limit1 = Math.min(limit, MAX_LIMIT);
    return spotifyFetch(`me/top/artists?time_range=${timeRange}&limit=${limit1}`);
}