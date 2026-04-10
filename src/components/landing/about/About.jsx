import './About.css';
import pulse from '../../../assets/pulse.png';
import play from '../../../assets/play.png';
import hexagon from '../../../assets/hexagon.png';

const About = () => {
    return (
        <section className="sp-features">
            <div className="sp-feat">
                <div className="sp-feat-icon">
                    <img src={pulse} alt="Pulse" />
                </div>
                <h3 className="sp-feat-title">Listening habits</h3>
                <p className="sp-feat-desc">
                    When you listen, how long, and how your taste shifts over time.
                </p>
            </div>

            <div className="sp-feat">
                <div className="sp-feat-icon">
                    <img src={play} alt="Play" />
                </div>
                <h3 className="sp-feat-title">Top tracks</h3>
                <p className="sp-feat-desc">
                    Your most played songs, artists, and albums — the music that defines you.
                </p>
            </div>

            <div className="sp-feat">
                <div className="sp-feat-icon">
                    <img src={hexagon} alt="Hexagon" />
                </div>
                <h3 className="sp-feat-title">Genre profile</h3>
                <p className="sp-feat-desc">
                    The genres you listen to most, and how they shape your soundprint.
                </p>
            </div>
        </section>
    )
}

export default About