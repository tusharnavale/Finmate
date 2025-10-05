// SipCalculator.jsx (Premium Data Viz Version)
import React, { useState, useEffect } from "react";
import "./SipCalculator.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#6366F1", "#10B981"]; // Indigo + Emerald

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [years, setYears] = useState("10");
  const [futureValue, setFutureValue] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, years]);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const annualReturn = (parseFloat(expectedReturn) || 0) / 100;
    const nYears = parseFloat(years) || 0;

    if (!P || !annualReturn || !nYears || P <= 0 || annualReturn <= 0 || nYears <= 0) {
      setFutureValue(null);
      setYearlyData([]);
      return;
    }

    // Final value
    const r = annualReturn / 12;
    const n = nYears * 12;
    const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const total = P * n;
    const gained = fv - total;

    setFutureValue(fv);
    setTotalInvested(total);
    setWealthGained(gained);

    // Generate yearly growth data for line chart
    const data = [];
    let currentValue = 0;
    for (let y = 1; y <= nYears; y++) {
      const months = y * 12;
      currentValue = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      data.push({
        year: y,
        value: Math.round(currentValue),
        invested: P * months,
      });
    }
    setYearlyData(data);
  };

  const suggestions = () => {
    if (!futureValue) return [];
    const target = 10000000; // ₹1 Cr
    const list = [];
    if (futureValue < target) {
      const extra = (target - futureValue) / (parseFloat(years) * 12);
      list.push(`Increase SIP by ₹${Math.ceil(extra)} to reach ₹1 Crore.`);
    } else {
      list.push("🎯 You're on track to build generational wealth!");
    }
    if (parseFloat(expectedReturn) < 10) {
      list.push("📈 Historically, equity SIPs deliver 10–15% CAGR.");
    }
    return list;
  };

  // Animated counter
  const AnimatedNumber = ({ value }) => (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="animated-number"
    >
      ₹{value.toLocaleString("en-IN")}
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="sip-wrapper">
        <div className="container">
          <div className="page-header">
            <span className="badge">Wealth Projection</span>
            <h1 className="sip-title">SIP Growth Simulator</h1>
            <p className="sip-subtitle">
              Visualize how compounding turns small investments into large wealth.
            </p>
          </div>

          <div className="sip-layout">
            {/* Inputs */}
            <div className="sip-card">
              <div className="sip-inputs">
                <div className="input-group">
                  <label>Monthly SIP (₹)</label>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                    min="100"
                  />
                </div>
                <div className="input-group">
                  <label>Expected Return (%)</label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    min="1"
                    max="30"
                  />
                </div>
                <div className="input-group">
                  <label>Time Horizon (Years)</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    min="1"
                    max="50"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            {futureValue !== null && (
              <div className="results-section">
                {/* Summary Metrics */}
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">Total Invested</div>
                    <AnimatedNumber value={totalInvested} />
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Future Value</div>
                    <AnimatedNumber value={futureValue} />
                  </div>
                  <div className="metric-card accent">
                    <div className="metric-label">Wealth Created</div>
                    <AnimatedNumber value={wealthGained} />
                  </div>
                </div>

                {/* Dual Charts */}
                <div className="charts-row">
                  {/* Donut Chart */}
                  <div className="chart-card">
                    <h3 className="chart-title">Wealth Composition</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Invested", value: totalInvested },
                            { name: "Returns", value: wealthGained },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell key="invested" fill={COLORS[0]} />
                          <Cell key="returns" fill={COLORS[1]} />
                        </Pie>
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Growth Timeline */}
                  <div className="chart-card">
                    <h3 className="chart-title">Wealth Over Time</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={yearlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
                        <YAxis
                          stroke="#64748B"
                          fontSize={12}
                          tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Value"]}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#6366F1"
                          strokeWidth={3}
                          dot={{ r: 3, fill: "#6366F1" }}
                          activeDot={{ r: 6, stroke: "#6366F1", strokeWidth: 2, fill: "white" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="suggestions-card">
                  <h3 className="suggestions-title">💡 Smart Insights</h3>
                  <ul>
                    {suggestions().map((s, i) => (
                      <li key={i}>{s}</li>
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