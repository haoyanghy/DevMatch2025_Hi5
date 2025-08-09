import React, { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

import "./ResultsPage.css";

const mentor = {
  name: "Crypto Mentor",
  profile: "AI-Selected Crypto Portfolio",
  lastUpdate: "2025-08-08",
  periodReturn: "24.7%",
  capitalInvested: "$12.50M",
  period: "6 Months",
  upside: "500.00",
  
  // Basic Stats
  tradingDays: 386,
  stabilityIndex: "5.0/5.0",
  sevenDayMatched: 727,
  
  // Performance data for different periods
  performance: {
    "7": {
      roi: "+9.26%",
      masterPnL: "+2,324.12",
      winRate: "53.66%",
      followersPnL: "+11.96",
      maxDrawdown: "4.07%",
      avgPnLPerTrade: "+36.57",
      wins: 31,
      losses: 35,
      profitLossRatio: "2.02 : 1",
      weeklyTrades: "69.07",
      avgHoldingTime: "1.03Days",
      roiVolatility: "3.60%",
      sharpeRatio: "0.97",
      sortinoRatio: "1.75"
    },
    "30": {
      roi: "+15.42%",
      masterPnL: "+8,924.56",
      winRate: "58.33%",
      followersPnL: "+45.82",
      maxDrawdown: "6.12%",
      avgPnLPerTrade: "+42.18",
      wins: 125,
      losses: 89,
      profitLossRatio: "2.15 : 1",
      weeklyTrades: "71.23",
      avgHoldingTime: "1.12Days",
      roiVolatility: "4.20%",
      sharpeRatio: "1.15",
      sortinoRatio: "1.92"
    },
    "90": {
      roi: "+28.74%",
      masterPnL: "+18,456.89",
      winRate: "61.45%",
      followersPnL: "+124.67",
      maxDrawdown: "8.94%",
      avgPnLPerTrade: "+38.94",
      wins: 387,
      losses: 243,
      profitLossRatio: "2.28 : 1",
      weeklyTrades: "68.91",
      avgHoldingTime: "1.18Days",
      roiVolatility: "5.10%",
      sharpeRatio: "1.32",
      sortinoRatio: "2.18"
    }
  },
  
  // Chart data for earnings and profit
  chartData: {
    "7": [
      { date: "Aug 03", cumulativeROI: 2.1, cumulativeProfit: 85.4, dailyProfit: 85.4 },
      { date: "Aug 04", cumulativeROI: 4.8, cumulativeProfit: 195.2, dailyProfit: 109.8 },
      { date: "Aug 05", cumulativeROI: 6.2, cumulativeProfit: 252.1, dailyProfit: 56.9 },
      { date: "Aug 06", cumulativeROI: 7.9, cumulativeProfit: 321.8, dailyProfit: 69.7 },
      { date: "Aug 07", cumulativeROI: 8.5, cumulativeProfit: 346.2, dailyProfit: 24.4 },
      { date: "Aug 08", cumulativeROI: 9.0, cumulativeProfit: 367.1, dailyProfit: -20.9 },
      { date: "Aug 09", cumulativeROI: 9.26, cumulativeProfit: 377.8, dailyProfit: 10.7 }
    ],
    "30": [
      { date: "Jul 10", cumulativeROI: 1.2, cumulativeProfit: 48.9, dailyProfit: 48.9 },
      { date: "Jul 15", cumulativeROI: 3.8, cumulativeProfit: 154.7, dailyProfit: 105.8 },
      { date: "Jul 20", cumulativeROI: 6.9, cumulativeProfit: 281.2, dailyProfit: 126.5 },
      { date: "Jul 25", cumulativeROI: 9.8, cumulativeProfit: 399.1, dailyProfit: 117.9 },
      { date: "Jul 30", cumulativeROI: 11.9, cumulativeProfit: 484.6, dailyProfit: 85.5 },
      { date: "Aug 04", cumulativeROI: 13.7, cumulativeProfit: 558.2, dailyProfit: -73.6 },
      { date: "Aug 09", cumulativeROI: 15.42, cumulativeProfit: 628.1, dailyProfit: 69.9 }
    ],
    "90": [
      { date: "May 11", cumulativeROI: 2.1, cumulativeProfit: 85.4, dailyProfit: 85.4 },
      { date: "May 25", cumulativeROI: 5.8, cumulativeProfit: 236.1, dailyProfit: 150.7 },
      { date: "Jun 08", cumulativeROI: 9.2, cumulativeProfit: 374.8, dailyProfit: 138.7 },
      { date: "Jun 22", cumulativeROI: 13.1, cumulativeProfit: 533.7, dailyProfit: 158.9 },
      { date: "Jul 06", cumulativeROI: 17.5, cumulativeProfit: 713.2, dailyProfit: 179.5 },
      { date: "Jul 20", cumulativeROI: 22.3, cumulativeProfit: 908.1, dailyProfit: 194.9 },
      { date: "Aug 03", cumulativeROI: 26.1, cumulativeProfit: 1063.4, dailyProfit: -155.3 },
      { date: "Aug 09", cumulativeROI: 28.74, cumulativeProfit: 1171.2, dailyProfit: 107.8 }
    ]
  },
  
  lastTradedAt: "2025-08-09 18:11:38"
};

export default function ResultsPage() {
  const [tradeAmount, setTradeAmount] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("7");
  const [activeTab, setActiveTab] = useState("Performance");
  const [chartPeriod, setChartPeriod] = useState("7");

  const handleCopyTrade = () => {
    if (tradeAmount) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const currentPerformance = mentor.performance[selectedPeriod];
  const currentChartData = mentor.chartData[chartPeriod];

  return (
    <div className="results-page">
      <div className="mentor-header">
        <h1>{mentor.name}</h1>
        <p>{mentor.profile}</p>
        <p>Last Update: {mentor.lastUpdate}</p>
      </div>

      {/* Basic Statistics */}
      <div className="basic-stats">
        <div className="stat-item">
          <span className="label">Trading Days</span>
          <span className="value">{mentor.tradingDays}</span>
        </div>
        <div className="stat-item">
          <span className="label">Stability Index</span>
          <span className="value">{mentor.stabilityIndex}</span>
        </div>
        <div className="stat-item">
          <span className="label">7-Day Matched</span>
          <span className="value">{mentor.sevenDayMatched}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={activeTab === "Performance" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Performance")}
        >
          Performance
        </button>
        <button 
          className={activeTab === "Statistics" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("Statistics")}
        >
          Statistics
        </button>
      </div>

      {/* Performance Tab */}
      {activeTab === "Performance" && (
        <div className="performance-section">
          <h3>Performance</h3>
          <div className="period-selector">
            {["7", "30", "90"].map(period => (
              <button
                key={period}
                className={selectedPeriod === period ? "active" : ""}
                onClick={() => setSelectedPeriod(period)}
              >
                {period} Days
              </button>
            ))}
          </div>

          {/* Performance Metrics */}
          <div className="performance-grid">
            <div className="metric-row">
              <span className="metric-label">ROI</span>
              <span className="metric-value">{currentPerformance.roi}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Master's PnL</span>
              <span className="metric-value">{currentPerformance.masterPnL}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Win Rate</span>
              <span className="metric-value">{currentPerformance.winRate}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Followers' PnL</span>
              <span className="metric-value">{currentPerformance.followersPnL}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Max. Drawdown</span>
              <span className="metric-value">{currentPerformance.maxDrawdown}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Avg. PnL per Trade</span>
              <span className="metric-value">{currentPerformance.avgPnLPerTrade}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Profit-to-Loss Ratio</span>
              <span className="metric-value">{currentPerformance.profitLossRatio}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Weekly Trades</span>
              <span className="metric-value">{currentPerformance.weeklyTrades}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Avg. Holding Time</span>
              <span className="metric-value">{currentPerformance.avgHoldingTime}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">ROI Volatility</span>
              <span className="metric-value">{currentPerformance.roiVolatility}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Sharpe Ratio</span>
              <span className="metric-value">{currentPerformance.sharpeRatio}</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Sortino Ratio</span>
              <span className="metric-value">{currentPerformance.sortinoRatio}</span>
            </div>
          </div>

          <div className="win-lose-line-display">
            <div className="win-lose-container">
              <div className="win-side">
                <span className="win-text">Win</span>
                <span className="win-number">{currentPerformance.wins}</span>
              </div>
              <div className="lose-side">
                <span className="lose-text">Lose</span>
                <span className="lose-number">{currentPerformance.losses}</span>
              </div>
            </div>
            <div className="connecting-line">
              <div 
                className="win-portion" 
                style={{
                  width: `${(currentPerformance.wins / (currentPerformance.wins + currentPerformance.losses)) * 100}%`,
                  height: '100%',
                  background: '#27ae60',
                  borderRadius: '4px 0 0 4px'
                }}
              ></div>
              <div 
                className="lose-portion" 
                style={{
                  width: `${(currentPerformance.losses / (currentPerformance.wins + currentPerformance.losses)) * 100}%`,
                  height: '100%',
                  background: '#e74c3c',
                  borderRadius: '0 4px 4px 0'
                }}
              ></div>
            </div>
          </div>

          <div className="last-traded">
            <span className="label">Last Traded at</span>
            <span className="value">{mentor.lastTradedAt}</span>
          </div>
          <div className="measured-in">Measured in: USDT</div>
        </div>
      )}

      {/* Statistics Tab - FIXED VERSION */}
      {activeTab === "Statistics" && (
        <div className="statistics-section">
          <h3>Statistics</h3>
          
          {/* Period selector for charts */}
          <div className="chart-period-selector">
            {["7", "30", "90"].map(period => (
              <button
                key={period}
                className={chartPeriod === period ? "active" : ""}
                onClick={() => setChartPeriod(period)}
              >
                {period} Days
              </button>
            ))}
          </div>

          {/* Earnings Line Chart - FIXED */}
          <div className="chart-container">
            <h4>Earnings</h4>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <LineChart 
                  data={currentChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis  
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cumulativeROI" 
                    stroke="#3498db" 
                    strokeWidth={2}
                    name="Cumulative ROI (%)"
                    dot={{ fill: '#3498db', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3498db', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cumulativeProfit" 
                    stroke="#27ae60" 
                    strokeWidth={2}
                    name="Cumulative Profit (USDT)"
                    dot={{ fill: '#27ae60', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#27ae60', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Profit Bar Chart */}
          <div className="chart-container">
            <h4>Profit</h4>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <BarChart 
                  data={currentChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                    formatter={(value) => [
                      `${value >= 0 ? '+' : ''}${value} USDT`,
                      value >= 0 ? 'Profit' : 'Loss'
                    ]}
                  />
                  <Bar 
                    dataKey="dailyProfit" 
                    name="Daily Profit/Loss (USDT)"
                    radius={[2, 2, 0, 0]}
                  >
                    {currentChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.dailyProfit >= 0 ? '#27ae60' : '#e74c3c'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* Copy Trade Section */}
      <div className="copy-trade-section">
        <div className="trade-input-container">
          <div className="recommended-amount">
            <span className="recommended-label">Recommended Trade Amount:</span>
            <span className="recommended-value">{mentor.upside} USDT</span>
          </div>
          <div className="trading-days-display">
            <span className="trading-days-label">Trading Days:</span>
            <span className="trading-days-value">{mentor.tradingDays}</span>
          </div>
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter trade amount"
              value={tradeAmount}
              onChange={(e) => setTradeAmount(e.target.value)}
            />
            <button className="copy-trade-btn" onClick={handleCopyTrade}>Copy Trade</button>
          </div>
        </div>
        {showNotification && (
          <div className="notification">Trade copied successfully!</div>
        )}
      </div>

    </div>
  );
}
