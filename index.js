const API_KEY = 'VEWSZ1LN7ZW1AQUQ';
let StockSymbol = 'AMZN';

async function getStockData(symbol) {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
        const data = response.data['Time Series (Daily)'];
        const chartData = [];
        for (const date in data) {
            chartData.push({
                x: date,
                y: data[date]['4. close']
            });
        }
        const plotData = [{
            x: chartData.map(d => d.x),
            y: chartData.map(d => d.y),
            type: 'line'
        }];
        Plotly.newPlot('chart', plotData);
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const symbol = document.getElementById('company').value.trim();
        getStockData(symbol);
    });
});