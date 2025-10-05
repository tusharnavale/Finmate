// SipCalculator.jsx
import React, { useState, useEffect } from "react";
import "./SipCalculator.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [years, setYears] = useState("10");
  const [futureValue, setFutureValue] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Calculate on input change (real-time)
  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, years]);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const r = (parseFloat(expectedReturn) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;

    if (!P || !r || !n || P <= 0 || r <= 0 || n <= 0) {
      setFutureValue(null);
      setChartData([]);
      return;
    }

    const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const total = P * n;

    setFutureValue(fv);
    setTotalInvested(total);

    // Chart data: breakdown of invested vs returns
    setChartData([
      {
        name: "Total Invested",
        amount: total,
        color: "#6366F1", // Indigo
      },
      {
        name: "Wealth Gained",
        amount: fv - total,
        color: "#10B981", // Emerald (growth)
      },
    ]);
  };

  // Smart Suggestions
  const getSuggestions = () => {
    if (!futureValue) return [];

    const suggestions = [];
    const target = 10000000; // ₹1 Cr
    const shortfall = target - futureValue;

    if (futureValue < target) {
      const extraNeeded = shortfall / ((parseFloat(years) || 10) * 12);
      suggestions.push(
        `Increase your SIP by ₹${Math.ceil(extraNeeded)} to reach ₹1 Crore in ${years} years.`
      );
    } else {
      suggestions.push("🎉 You're on track to build significant wealth!");
    }

    if (parseFloat(expectedReturn) < 10) {
      suggestions.push("Consider equity-focused funds for higher long-term returns.");
    }

    return suggestions;
  };

  return (
    <>
      <Navbar />
      <div className="sip-wrapper">
        <div className="container">
          <div className="page-header">
            <span className="badge">Investment Planning</span>
            <h1 className="sip-title">SIP Calculator</h1>
            <p className="sip-subtitle">
              See how disciplined investing can grow your wealth over time.
            </p>
          </div>

          <div className="sip-layout">
            {/* Inputs */}
            <div className="sip-card">
              <div className="sip-inputs">
                <div className="input-group">
                  <label>Monthly Investment (₹)</label>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    placeholder="e.g. 5000"
                    min="100"
                  />
                </div>

                <div className="input-group">
                  <label>Expected Annual Return (%)</label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    placeholder="e.g. 12"
                    min="1"
                    max="30"
                  />
                </div>

                <div className="input-group">
                  <label>Investment Duration (Years)</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="e.g. 10"
                    min="1"
                    max="50"
                  />
                </div>
              </div>
            </div>

            {/* Results & Chart */}
            {futureValue !== null && (
              <div className="results-section">
                <div className="summary-cards">
                  <div className="summary-card">
                    <div className="card-value">₹{totalInvested.toLocaleString("en-IN")}</div>
                    <div className="card-label">Total Invested</div>
                  </div>
                  <div className="summary-card">
                    <div className="card-value">₹{futureValue.toLocaleString("en-IN")}</div>
                    <div className="card-label">Future Value</div>
                  </div>
                  <div className="summary-card highlight">
                    <div className="card-value">+₹{(futureValue - totalInvested).toLocaleString("en-IN")}</div>
                    <div className="card-label">Wealth Gained</div>
                  </div>
                </div>

                {/* Chart */}
                <div className="chart-container">
                  <h3 className="chart-title">Wealth Breakdown</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip
                        formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Amount"]}
                        labelFormatter={() => "Breakdown"}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend
                        align="center"
                        verticalAlign="top"
                        height={40}
                        formatter={(value) => (
                          <span style={{ color: "#475569", fontSize: "14px" }}>{value}</span>
                        )}
                      />
                      <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry, index) => (
                          <rect key={`bar-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Smart Suggestions */}
                <div className="suggestions">
                  <h3 className="suggestions-title">💡 Smart Insights</h3>
                  <ul>
                    {getSuggestions().map((suggestion, i) => (
                      <li key={i}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SipCalculator;