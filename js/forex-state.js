const ForexState = {
    currentPair: 'EUR/USD',
    timeframe: '1W',
    chartData: null,
    lastUpdate: null,
    chartInstance: null,

    initialize() {
        if (!this.chartData) {
            this.generateNewData();
        }
        return this;
    },

    generateNewData() {
        this.chartData = Array.from({length: 20}, () => 1.09 + (Math.random() * 0.02 - 0.01));
        this.lastUpdate = Date.now();
    },

    updateTimeframe(timeframe) {
        this.timeframe = timeframe;
        this.generateNewData();
    },

    cleanup() {
        if (this.chartInstance) {
            this.chartInstance.destroy();
            this.chartInstance = null;
        }
    }
};

window.ForexState = ForexState;
