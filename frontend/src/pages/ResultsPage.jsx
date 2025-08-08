import React, { useState } from "react";
import { Line, Radar } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, RadialLinearScale, Filler, Tooltip, Legend, Title } from "chart.js";
import "./ResultsPage.css";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, RadialLinearScale, Filler, Tooltip, Legend, Title);

const mentor = {
  name: "Crypto Mentor",
  profile: "Top AI-Selected Crypto Investor",
  lastUpdate: "2025-08-08",
  turnover: "3.2%",
  portfolioValue: "$15.21 M",
  holdings: [
    {
      symbol: "BTC", name: "Bitcoin",
      percent: "40.5",
      url: "https://www.tradingview.com/chart/?symbol=CRYPTO%3ABTCUSD",
      price: 117355.29, priceChange: 2375.45, priceChangePct: 2.07,
      priceHistory: [30000,33000,38000,43000,49000,51000,70000,80000,90000,100000,112000,117000],
      gfScore: { labels: ["Valuation", "Growth", "Profitability", "Safety", "Momentum"], values: [6.2,8.7,9.4,8.8,9.6] },
      about: "The original, largest, and most adopted cryptocurrency, used as both store-of-value and payment.",
      stats: {
        "Market Cap": "2.34T USD", "ATH": "123,217.39 USD", "Volume 24h": "59.38B USD", "Circulating Supply": "19.90 M", "Max Supply": "21.00 M"
      },
      facts: [
        "US executive order allows Bitcoin in 401(k) plans.",
        "SBI Japan launching Bitcoin ETF on Tokyo Exchange.",
        "BTC retests $108K support—potential for 50% rise."
      ],
      news: [
        { source: "CryptoPotato", time: "13 mins ago", headline: "Trump Signs Executive Order to Allow Bitcoin and Crypto in 401(k)s" },
        { source: "ZyCrypto", time: "2h ago", headline: "Bitcoin's 1070 Days Cycle Shows Capacity to Rise to $300,000 in 2025" }
      ],
      website: "https://bitcoin.org/",
      whitepaper: "https://bitcoin.org/bitcoin.pdf"
    },
    {
      symbol: "ETH", name: "Ethereum",
      percent: "22.7",
      url: "https://www.tradingview.com/chart/?symbol=CRYPTO%3AETHUSD",
      price: 6589.17, priceChange: -40.22, priceChangePct: -0.61,
      priceHistory: [2200,2300,2700,3200,3900,4100,4990,5500,5900,6200,6400,6589],
      gfScore: { labels: ["Valuation", "Growth", "Profitability", "Safety", "Momentum"], values: [5.7,9.5,8.2,7.3,8.1] },
      about: "The leading smart contract blockchain powering DeFi, NFTs, and many tokens.",
      stats: {
        "Market Cap": "780B USD", "ATH": "6789.12 USD", "Volume 24h": "28.92B USD", "Circulating Supply": "120.2 M", "Max Supply": "—"
      },
      facts: [
        "Ethereum is moving to Proof-of-Stake (Merge complete in 2024).",
        "Main hub for NFT and DeFi development.",
        "ETH ETFs set for approval in several countries."
      ],
      news: [
        { source: "CoinDesk", time: "25 mins ago", headline: "Ethereum DeFi Volume Hits New High in Asia" },
        { source: "Blockworks", time: "1h ago", headline: "ETH ETFs Near Approval After Regulatory Nod" }
      ],
      website: "https://ethereum.org/", whitepaper: "https://ethereum.org/en/whitepaper/"
    },
    {
      symbol: "SOL", name: "Solana",
      percent: "12.8",
      url: "https://www.tradingview.com/chart/?symbol=CRYPTO%3ASOLUSD",
      price: 184.22, priceChange: 2.33, priceChangePct: 1.28,
      priceHistory: [21,33,44,53,60,68,102,128,142,162,176,184],
      gfScore: { labels: ["Valuation", "Growth", "Profitability", "Safety", "Momentum"], values: [3.3,8.8,7.9,5.2,9.3] },
      about: "Ultra-fast, scalable smart contract platform, known for its vibrant ecosystem and low fees.",
      stats: {
        "Market Cap": "82.7B USD", "ATH": "216.07 USD", "Volume 24h": "7.32B USD", "Circulating Supply": "439.7 M", "Max Supply": "—"
      },
      facts: [
        "Rapidly growing DeFi and meme ecosystem.",
        "High institutional inflows in 2025.",
        "Solana Pay launched for merchants globally."
      ],
      news: [
        { source: "SolanaNews", time: "56 mins ago", headline: "Solana Pay Integration Goes Global" },
        { source: "Blockworks", time: "3h ago", headline: "MEME Coins on Solana: Next Wave of Growth?" }
      ],
      website: "https://solana.com/", whitepaper: "https://solana.com/solana-whitepaper.pdf"
    }
  ]
};

const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

export default function ResultsPage() {
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  return (
    <div className="results-bg">
      <div className="results-container">
        {/* TRADER header */}
        <div className="trader-profile">
          <h2>{mentor.name}</h2>
          <div className="profile-desc">{mentor.profile}</div>
          <div className="trader-meta">
            <span>Last update: <b>{mentor.lastUpdate}</b></span>
            <span> · Portfolio Value: <b>{mentor.portfolioValue}</b></span>
            <span> · Turnover: <b>{mentor.turnover}</b></span>
          </div>
          <div className="trading-style-box">
            <span>Strategy: </span> <b>AI-Optimized, Crypto-Only</b>
          </div>
        </div>

        {/* CRYPTO HOLDINGS */}
        <div className="top-holdings" style={{marginTop:18}}>
          <span style={{fontWeight:600}}>Top Crypto Holdings:</span>
          {mentor.holdings.map(h => (
            <button
              key={h.symbol}
              className={`hold-chip ${selectedCrypto === h.symbol ? "active" : ""}`}
              onClick={() => setSelectedCrypto(selectedCrypto === h.symbol ? null : h.symbol)}
              aria-label={`Show details of ${h.name}`}
            >
              {h.symbol} ({h.percent}%)
            </button>
          ))}
        </div>

        {/* CRYPTO INFO */}
        {selectedCrypto &&
          <CryptoDetailBox
            crypto={mentor.holdings.find(h => h.symbol === selectedCrypto)}
            months={months}
          />
        }
        {!selectedCrypto && (
          <div className="crypto-keyfacts" style={{marginTop:28, textAlign:"center"}}>
            <span style={{color:"#888"}}>Click any crypto above to learn everything about it!</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CryptoDetailBox({ crypto, months }) {
  const priceLineData = {
    labels: months,
    datasets: [
      {
        label: `${crypto.symbol} Price`,
        data: crypto.priceHistory,
        borderColor: '#1fb7ff',
        backgroundColor: 'rgba(31,183,255,0.13)',
        fill: true,
        tension: 0.24,
        pointRadius: 3
      }
    ]
  };
  const priceLineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'nearest', intersect: false }
    },
    scales: {
      x: { grid: { display: false }, title: { display: true, text: "Month" }},
      y: { grid: { color: "#e3eefb" }, title: { display: true, text: "Price (USD)" } }
    }
  };

  const radarData = {
    labels: crypto.gfScore.labels,
    datasets: [{
      label: "GF Score",
      data: crypto.gfScore.values,
      backgroundColor: "rgba(31,183,255,0.19)",
      borderColor: "#1fb7ff",
      pointBackgroundColor: "#1fb7ff"
    }]
  };
  const radarOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      r: {
        min: 0, max: 10, ticks: { stepSize: 2, color: "#888" },
        pointLabels: { color: "#197cdf", font: { size: 13 }},
        grid: { color: "#f1f7fc" }
      }
    }
  };

  const stats = crypto.stats || {};

  return (
    <div className="holding-detail-box">
      <h3>
        <a href={crypto.url} target="_blank" rel="noopener noreferrer">{crypto.name} ({crypto.symbol})</a>
      </h3>
      <div className="crypto-meta">
        <span style={{fontWeight:700, fontSize:"1.2em", color:"#219b80"}}>${crypto.price.toLocaleString()}</span>{" "}
        <span className={crypto.priceChange>0 ? "gain" : "loss"}>
          {crypto.priceChange>0 && "+"}{crypto.priceChange} ({crypto.priceChangePct>0 && "+"}{crypto.priceChangePct}%)
        </span>
      </div>
      <div className="crypto-about" style={{marginBottom:8}}>{crypto.about}</div>

      {/* --- PRICE CHART --- */}
      <div className="chart-section">
        <b>Price (Last 12 Months):</b>
        <div className="mini-chart">
          <Line data={priceLineData} options={priceLineOptions} height={110} />
        </div>
      </div>

      {/* --- RADAR (GF) --- */}
      <div className="chart-section">
        <b>GF Score (Valuation, Growth, Profitability, Safety, Momentum):</b>
        <div className="radar-chart">
          <Radar data={radarData} options={radarOptions} height={110} />
        </div>
      </div>

      {/* --- Key STATS Table --- */}
      <div className="crypto-keyfacts">
        <h4>Key Stats</h4>
        <table>
          <tbody>
            {Object.entries(stats).map(([k,v]) =>
              <tr key={k}><td>{k}</td><td style={{fontWeight:600}}>{v}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Key FACTS --- */}
      {crypto.facts && (
        <div className="crypto-keyfacts" style={{marginTop:12}}>
          <h4>Key Facts</h4>
          <ul>
            {crypto.facts.map((fact,i) => <li key={i}>{fact}</li>)}
          </ul>
        </div>
      )}
      {/* --- NEWS --- */}
      {crypto.news && (
        <div className="crypto-keyfacts" style={{marginTop:10}}>
          <h4>Recent News</h4>
          <ul>
            {crypto.news.map((n,i) =>
              <li key={i}><span style={{color:"#888"}}>{n.time} · {n.source}:</span> {n.headline}</li>
            )}
          </ul>
        </div>
      )}
      {/* --- LINKS for beginners --- */}
      <div className="crypto-keyfacts" style={{marginTop:10}}>
        <h4>Learn More / Whitepaper</h4>
        <div className="crypto-links">
          <a href={crypto.website} target="_blank" rel="noopener noreferrer">Website</a>
          {crypto.whitepaper && <a href={crypto.whitepaper} target="_blank" rel="noopener noreferrer">Whitepaper</a>}
        </div>
      </div>
    </div>
  );
}
