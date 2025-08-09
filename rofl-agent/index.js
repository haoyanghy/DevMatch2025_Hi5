const express = require("express");
const { ethers } = require("ethers");
const sapphire = require("@oasisprotocol/sapphire-paratime");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// Load contract ABI and address
const contractABI = require("./config/PortfolioAgent.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

// Initialize provider and signer
const provider = new ethers.providers.JsonRpcProvider(process.env.SAPPHIRE_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Sapphire wrapper for encryption/decryption
const sapphireProvider = new sapphire.Sapphire(provider);

// Initialize contract instance
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Mock financial API data
const mockPortfolioData = [
  { asset: "BTC", price: 30000, risk: "high" },
  { asset: "ETH", price: 2000, risk: "medium" },
  { asset: "USDT", price: 1, risk: "low" },
];

// Mock financial API server
const app = express();
app.use(express.json());

app.post("/mock-financial-api", async (req, res) => {
  const { preferences } = req.body;
  // Simulate portfolio data scraping
  const mockData = {
    stocks: [
      { symbol: "AAPL", price: 150 },
      { symbol: "GOOGL", price: 2800 },
    ],
    crypto: [
      { symbol: "BTC", price: 30000 },
      { symbol: "ETH", price: 2000 },
    ],
  };
  // Analyze data based on preferences
  const recommendations = analyzeData(preferences, mockData);
  res.json(recommendations);
});

// Analyze data based on user preferences
function analyzeData(preferences, mockData) {
  // Example: filter low-risk assets
  const lowRiskAssets = mockData.stocks.filter((stock) => stock.price < 200);
  return { recommendations: lowRiskAssets };
}

// Listen for PreferencesSubmitted event
contract.on("PreferencesSubmitted", async (event) => {
  console.log("PreferencesSubmitted event detected:", event);

  // Fetch encrypted preferences
  const encryptedPreferences = await contract.getPreferences(event.user);
  const preferences = sapphireProvider.decrypt(encryptedPreferences, process.env.PRIVATE_KEY);

  // Scrape mock financial API
  const response = await axios.post("http://localhost:3000/mock-financial-api", { preferences });
  const recommendations = response.data;

  // Encrypt recommendations
  const encryptedRecommendations = sapphireProvider.encrypt(recommendations, process.env.PRIVATE_KEY);

  // Send recommendations back to the contract
  const tx = await contract.submitRecommendations(event.user, encryptedRecommendations, {
    gasLimit: 500000,
  });
  await tx.wait();
  console.log("Recommendations submitted successfully.");
});

// Start mock financial API server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock financial API server running on port ${PORT}`);
});
