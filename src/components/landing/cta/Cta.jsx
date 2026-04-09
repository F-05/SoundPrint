import './Cta.css';
import SpotifyLogo from '../../../assets/spotify-logo.png';
import { redirectToSpotifyLogin } from '../../../auth/spotify.js';  

const Cta = () => {
    return (
        <section className="sp-hero">
            <p className="sp-cta-eyebrow">YOUR LISTENING IDENTITY</p>

            <h2 className="sp-cta-title">
                Music says more about <br />
                you <br />
                than you <span>think</span>
            </h2>

            <p className="sp-cta-desc">
                Soundprint turns your Spotify history into a portrait of how 
                you actually listen — your habits, your taste, your sound.
            </p>

            <button className="sp-cta-button" onClick={() => redirectToSpotifyLogin()}>
                <img src={SpotifyLogo} alt="" className="sp-cta-button-icon" aria-hidden="true" />
                <span>Connect with Spotify</span>
            </button>

            <div className="sp-disclaimer">
                <p className="sp-disclaimer-one">Read-only access</p>
                <p className="sp-disclaimer-two">No data stored</p>
                <p className="sp-disclaimer-three">Disconnect anytime</p>
            </div>
        </section>
    )
}

export default Cta