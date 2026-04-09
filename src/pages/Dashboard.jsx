export default function Dashboard() {
    return (
        <main
            style={{
                minHeight: '100vh',
                display: 'grid',
                placeItems: 'center',
                padding: '2rem',
                background: '#0f172a',
                color: '#e2e8f0',
                fontFamily: 'system-ui, sans-serif',
            }}
        >
            <section style={{ maxWidth: '42rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Dashboard</h1>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
                    Spotify connected. This page is ready for your listening insights and charts.
                </p>
            </section>
        </main>
    );
}
