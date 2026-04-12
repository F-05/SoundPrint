import { useState, useEffect } from 'react';
import { getRecentlyPlayed } from '../api/recentlyPlayed';
import { getTotalMinutes, getPeakListeningHour, formatHour, getHourlyBreakdown } from '../utils/time';

export function useListeningStats() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRecentlyPlayed(50)
            .then(res => {
                const items = res.items ?? []
                setData({
                    totalMinutes: getTotalMinutes(items),
                    peakHour: formatHour(getPeakListeningHour(items)),
                    hourlyBreakdown: getHourlyBreakdown(items),
                    trackCount: items.length
                });
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, []);

    return { data, loading, error }
}