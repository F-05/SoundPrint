/* PKCE (Proof Key for Code Exchange) helpers for OAuth 2.0 flows. */
const CODE_VERIFIER_STORAGE_KEY = "spotify_pkce_code_verifier";

function storeCodeVerifier(verifier) {
    sessionStorage.setItem(CODE_VERIFIER_STORAGE_KEY, verifier);
}

export function getCodeVerifier() {
    return sessionStorage.getItem(CODE_VERIFIER_STORAGE_KEY);
}

export function clearCodeVerifier() {
    sessionStorage.removeItem(CODE_VERIFIER_STORAGE_KEY);
}

export async function generatePKCE() {
    const verifier =
        crypto.randomUUID().replace(/-/g, "") +
        crypto.randomUUID().replace(/-/g, "");
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

    storeCodeVerifier(verifier);

    return { challenge };
}