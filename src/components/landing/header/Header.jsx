import "./Header.css";

const Header = () => {
    return (
        <header className="sp-header">
            <nav className="sp-nav" aria-label="Primary">
                <a href="#top" className="sp-nav-logo" aria-label="SoundPrint home">
                    <span className="sp-nav-dot" aria-hidden="true"></span>
                    SoundPrint
                </a>

                <p className="sp-nav-meta">by Spotify API</p>
            </nav>
        </header>
    )
}

export default Header