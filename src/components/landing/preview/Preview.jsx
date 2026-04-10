import './Preview.css';

const Preview = () => {
    return (
        <section className="sp-preview">
            <h3 className="sp-preview-label">Preview</h3>

            <div className="sp-stat-row">
                <div className="sp-stat">
                    <p className="sp-stat-label">Top genre</p>
                    <h3 className="sp-stat-val">Indie</h3>
                    <p className="sp-stat-sub">38% of listens</p>
                </div>

                <div className="sp-stat">
                    <p className="sp-stat-label">Peak hour</p>
                    <h3 className="sp-stat-val">11pm</h3>
                    <p className="sp-stat-sub">most active</p>
                </div>

                <div className="sp-stat">
                    <p className="sp-stat-label">This month</p>
                    <h3 className="sp-stat-val">214</h3>
                    <p className="sp-stat-sub">Songs listened to</p>
                </div>
            </div>

            <div className="sp-bar-row">
                <div className="sp-bar-item">
                    <p className="sp-bar-name">Indie</p>
                    <div className="sp-bar-track">
                        <div className="sp-bar-fill" style={{ width: '38%' }}></div>
                    </div>
                    <p className="sp-bar-pct">38%</p>
                </div>

                <div className="sp-bar-item">
                    <p className="sp-bar-name">Pop</p>
                    <div className="sp-bar-track">
                        <div className="sp-bar-fill" style={{ width: '24%' }}></div>
                    </div>
                    <p className="sp-bar-pct">24%</p>
                </div>

                <div className="sp-bar-item">
                    <p className="sp-bar-name">Hip-hop</p>
                    <div className="sp-bar-track">
                        <div className="sp-bar-fill" style={{ width: '18%' }}></div>
                    </div>
                    <p className="sp-bar-pct">18%</p>
                </div>

                <div className="sp-bar-item">
                    <p className="sp-bar-name">Electronic</p>
                    <div className="sp-bar-track">
                        <div className="sp-bar-fill" style={{ width: '12%' }}></div>
                    </div>
                    <p className="sp-bar-pct">12%</p>
                </div>
                
                <div className="sp-bar-item">
                    <p className="sp-bar-name">Jazz</p>
                    <div className="sp-bar-track">
                        <div className="sp-bar-fill" style={{ width: '8%' }}></div>
                    </div>
                    <p className="sp-bar-pct">8%</p>
                </div>
            </div>
        </section>
    )
}

export default Preview