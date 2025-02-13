// Load persisted state if available
window.forexGlobalState = (function() {
    const stored = localStorage.getItem('forexGlobalState');
    const defaultState = {
        chartInstance: null,
        chartData: null,
        timeframe: '1W',
        currentPair: 'EUR/USD',
        wasOnForexPage: false
    };
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            return Object.assign({}, defaultState, parsed, { chartInstance: null });
        } catch (error) {
            console.error('Error parsing stored forex state:', error);
            return defaultState;
        }
    }
    return defaultState;
})();

function initializeForexChart() {
    const ctx = document.getElementById('forexChart');
    if (!ctx) return;

    // Destroy existing chart instance if any
    if (window.forexGlobalState.chartInstance) {
        window.forexGlobalState.chartInstance.destroy();
    }

    // Use existing data or generate new, then persist it
    if (!window.forexGlobalState.chartData) {
        window.forexGlobalState.chartData = Array.from({length: 20}, () =>
            1.09 + (Math.random() * 0.02 - 0.01)
        );
    }

    // Create new chart instance with dataset lines removed
    window.forexGlobalState.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 20}, (_, i) => i),
            datasets: [{
                label: window.forexGlobalState.currentPair,
                data: window.forexGlobalState.chartData,
                borderColor: 'transparent', // remove line color
                borderWidth: 0,             // no line width
                pointRadius: 0,             // no points
                fill: false,
                tension: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { 
                    display: true, // show bottom axis
                    grid: { display: false }
                },
                y: {
                    display: true, // show left axis ticks/labels
                    grid: { display: false },
                    ticks: { color: '#9ca3af' }
                }
            }
        }
    });
}

function initializeTimeframeButtons() {
    const buttons = document.querySelectorAll('.timeframe-btn');
    buttons.forEach(btn => {
        if (btn.dataset.period === window.forexGlobalState.timeframe) {
            btn.classList.add('bg-blue-500');
        }
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('bg-blue-500'));
            btn.classList.add('bg-blue-500');
            window.forexGlobalState.timeframe = btn.dataset.period;
            window.forexGlobalState.chartData = Array.from({length: 20}, () =>
                1.09 + (Math.random() * 0.02 - 0.01)
            );
            initializeForexChart();
        });
    });
}

// Export functions for use in navigation.js
window.forexChart = {
    initialize: () => {
        initializeForexChart();
        initializeTimeframeButtons();
    }
};

// Persist state before page unload
window.addEventListener('beforeunload', () => {
    // Remove chartInstance as it can't be serialized
    const stateToStore = Object.assign({}, window.forexGlobalState);
    delete stateToStore.chartInstance;
    localStorage.setItem('forexGlobalState', JSON.stringify(stateToStore));
});
