import "./Footer.css";

const Footer = () => {
    return (
        <footer className="sp-footer">
            <a href="#top" className="sp-footer-logo" aria-label="SoundPrint home">
                <span className="sp-nav-dot" aria-hidden="true"></span>
                SoundPrint
            </a>

            <p className="sp-footer-note">Not affiliated with Spotify AB</p>
        </footer>
    )
}

export default Footer