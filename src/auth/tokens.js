let _accessToken = null;
let _refreshToken = null;
let _expiresAt = null;

const REFRESH_TOKEN_KEY = "spotify_refresh_token";

export function setTokens({ accessToken, refreshToken, expiresIn }) {
    _accessToken = accessToken;
    _expiresAt = Date.now() + expiresIn * 1000;

    if (refreshToken) {
        _refreshToken = refreshToken;
        sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
}

export function getAccessToken() {
    return _accessToken;
}

export function getRefreshToken() {
  return _refreshToken || sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isExpired() {
    return !_expiresAt || Date.now() > _expiresAt - 60_000;
}

export function clearTokens() {
  _accessToken = null;
  _refreshToken = null;
  _expiresAt = null;
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function refreshAccessToken(redirectToLogin = () => {
    window.location.href = '/';
}) {
    if (!isExpired()) {
        return;
    }

    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
        redirectToLogin(); 
        return;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        })
    });

    const data = await response.json();

    if (!response.ok) {
        clearTokens();
        redirectToLogin();
        return;
    }

    setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: data.expires_in,
    });

    return data;
}
