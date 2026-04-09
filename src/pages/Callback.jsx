import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSpotifyCallback } from "../auth/spotify.js";

export default function Callback() {
    const navigate = useNavigate();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');
        const state = params.get('state');

        if (error) {
            console.error("Spotify authorization error:", error);
            navigate('/');
            return;
        }

        if (!code || !state) {
            console.error("Missing code or state in Spotify callback");
            navigate('/');
            return;
        }

        handleSpotifyCallback()
            .then(() => {
                navigate('/dashboard');
            })
            .catch((err) => {
                console.error("Error handling Spotify callback:", err);
                navigate('/');
            });
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Connecting to Spotify...</p>
        </div>
    );
}   
