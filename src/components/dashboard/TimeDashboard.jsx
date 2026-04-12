import React from 'react';
import { useListeningStats } from '../../hooks/useTopItems';
import './TimeDashboard.css';

export function TimeDashboard() {
    const { data, loading, error } = useListeningStats();

    const maxHourlyCount = Math.max(
        1,
        ...(data?.hourlyBreakdown?.map(({ count }) => count) ?? [])
    );

    return (
        <main className="sp-dashboard">
            <section className="sp-dashboard-inner">
                <p className="sp-dashboard-kicker">Spotify connected</p>
                <h1 className="sp-dashboard-title">Your listening dashboard</h1>
                <p className="sp-dashboard-copy">
                    A quick read on your latest Spotify plays.
                </p>

                {loading && (
                    <p className="sp-dashboard-state">Loading your listening stats...</p>
                )}

                {error && (
                    <p className="sp-dashboard-state sp-dashboard-state--error">
                        Could not load Spotify stats: {error}
                    </p>
                )}

                {data && !loading && !error && (
                    <>
                        <div className="sp-dashboard-stats">
                            <StatCard label="Tracks analyzed" value={data.trackCount} />
                            <StatCard label="Minutes played" value={data.totalMinutes} />
                            <StatCard label="Peak hour" value={data.peakHour} />
                        </div>

                        <section
                            className="sp-dashboard-panel"
                            aria-labelledby="hourly-breakdown-heading"
                        >
                            <h2 id="hourly-breakdown-heading" className="sp-dashboard-section-title">
                                Plays by hour
                            </h2>
                            <div className="sp-dashboard-hours">
                                {data.hourlyBreakdown.map(({ hour, label, count }) => {
                                    const heightLevel = Math.ceil((count / maxHourlyCount) * 10);
                                    const barClassName = [
                                        'sp-dashboard-hour-bar',
                                        `sp-dashboard-hour-bar--${heightLevel}`,
                                        count > 0 ? 'sp-dashboard-hour-bar--active' : '',
                                    ].filter(Boolean).join(' ');

                                    return (
                                        <div
                                            key={hour}
                                            className="sp-dashboard-hour"
                                            title={`${label}: ${count} plays`}
                                        >
                                            <div className={barClassName} />
                                            <span className="sp-dashboard-hour-label">
                                                {hour}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </section>
        </main>
    );
}

function StatCard({ label, value }) {
    return (
        <article className="sp-dashboard-stat">
            <p className="sp-dashboard-stat-label">{label}</p>
            <strong className="sp-dashboard-stat-value">{value}</strong>
        </article>
    );
}
