// Total minutes listened from recently played tracks
export function getTotalMinutes(items) {
    const totalMs = items.reduce((sum, item) => {
        return sum + (item.track?.duration_ms ?? 0);
    }, 0);
    return Math.round(totalMs / 60000);
}

// Peak listening hour (0-23)
export function getPeakListeningHour(items) {
    const hourCounts = new Array(24).fill(0);

    items.forEach(item => {
        if (!item.played_at) return;
        const hour = new Date(item.played_at).getHours()
        hourCounts[hour]++;
    })

    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
    return peakHour;
}

// Format hour as readable string
export function formatHour(hour) {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return `${hour % 12} ${hour < 12 ? "AM" : "PM"}`;
}

// Full heatmap data - all 24 hours with counts
export function getHourlyBreakdown(items) {
    const hourCounts = new Array(24).fill(0);

    items.forEach(item => {
        if (!item.played_at) return;
        const hour = new Date(item.played_at).getHours()
        hourCounts[hour]++;
    })

    return hourCounts.map((count, hour) => ({
        hour,
        label: formatHour(hour),
        count,
    }));
}
