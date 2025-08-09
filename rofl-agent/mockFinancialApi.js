const express = require("express");

const app = express();
app.use(express.json());

// Mock financial data
const mockData = {
  stocks: [
    { symbol: "AAPL", price: 150 },
    { symbol: "GOOGL", price: 2800 },
    { symbol: "MSFT", price: 300 },
  ],
  crypto: [
    { symbol: "BTC", price: 30000 },
    { symbol: "ETH", price: 2000 },
    { symbol: "ADA", price: 0.5 },
  ],
};

// Endpoint to fetch mock financial data
app.post("/api/portfolio", (req, res) => {
  const { preferences } = req.body;

  // Example: filter data based on preferences
  const filteredData = {
    stocks: mockData.stocks.filter((stock) => stock.price < preferences.maxPrice),
    crypto: mockData.crypto.filter((crypto) => crypto.price < preferences.maxPrice),
  };

  res.json(filteredData);
});

// Start server
const PORT = process.env.MOCK_API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock Financial API running on port ${PORT}`);
});
