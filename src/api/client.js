import { getAccessToken, refreshAccessToken } from '../auth/tokens.js';

export async function spotifyFetch(endpoint, retries = 3) {
    await refreshAccessToken();
    
    const token = getAccessToken();
    if (!token) {
        window.location.href = '/'
        return;
    }

    const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    
    if (res.status === 401) {
        window.location.href = '/'
        return;
    }

    if (res.status === 429 && retries > 0) {
        const retryAfter = parseInt(res.headers.get('Retry-After') ?? '1', 10);
        const backoff = retryAfter * 1000 * (4 - retries); // Exponential backoff
        await new Promise(r => setTimeout(r, backoff));
        return spotifyFetch(endpoint, retries - 1);
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(`Spotify API error: ${res.status} ${res.statusText} - ${error.message || 'No error message'}`);
    }

    return res.json();
}