import { redirectToSpotifyLogin } from '../auth/spotify.js';

export default function Landing() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">Welcome to SoundPrint</h1>
            <p className="text-lg mb-8">Discover your Spotify listening habits with personalized insights and visualizations.</p>
            <button
                onClick={redirectToSpotifyLogin}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded text-lg font-semibold transition"
            >
                Connect with Spotify
            </button>
        </div>
    );
}