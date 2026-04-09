import { clearCodeVerifier, getCodeVerifier, generatePKCE } from "./pkce.js";
import { clearTokens, setTokens } from "./tokens.js";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const OAUTH_STATE_KEY = "spotify_oauth_state";
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const SCOPES = [
    'user-top-read',
    'user-read-recently-played',
    'user-read-private',
].join(' ');

export async function redirectToSpotifyLogin() {
    const { challenge } = await generatePKCE();
    const state = crypto.randomUUID();
    sessionStorage.setItem(OAUTH_STATE_KEY, state);

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        code_challenge_method: 'S256',
        code_challenge: challenge,
        scope: SCOPES,
        state,
    });

    window.location.assign(`${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`);
}

export async function handleSpotifyCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const returnedState = params.get('state');
    const savedState = sessionStorage.getItem(OAUTH_STATE_KEY);


    const error = params.get('error');

    if (error) {
        throw new Error(`Spotify authorization failed: ${error}`);
    }

    if (returnedState !== savedState) {
        // State mismatch - possible CSRF attack
        console.error("State mismatch");
        sessionStorage.removeItem(OAUTH_STATE_KEY);
        clearCodeVerifier();
        clearTokens();
        window.location.href = '/';
        return;
    }
    sessionStorage.removeItem(OAUTH_STATE_KEY);

    const verifier = getCodeVerifier();

    if (!code) {
        throw new Error('No authorization code found');
    }

    if (!verifier) {
        throw new Error("Missing PKCE verifier in session storage");
    }

    const response = await fetch(SPOTIFY_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier,
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Token exchange failed: ${data.error_description || data.error}`);
    }

    setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
    });

    clearCodeVerifier();

    return data;
}