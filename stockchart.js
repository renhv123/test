// StockChart.js
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function StockChart() {
    const [stockData, setStockData] = useState({});

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const API_KEY = 'VEWSZ1LN7ZW1AQUQ';
                let StockSymbol = 'AMZN';
                const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&apikey=${API_KEY}`);
                setStockData(response.data['Time Series (Daily)']);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };
        fetchStockData();
    }, []);

    const dates = stockData ? Object.keys(stockData) : [];
    const closingPrices = dates.map(date => parseFloat(stockData[date]['4. close'] || 0));

    return (
        <center>
            <h2>Stock Chart</h2>
            <Plot
                data={[
                    {
                        x: dates,
                        y: closingPrices,
                        type: 'line'
                    }
                ]}
            />
        </center>
    );
}

export default StockChart;