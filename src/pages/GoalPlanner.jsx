// GoalPlanner.jsx
import React, { useState, useEffect } from "react";
import "./GoalPlanner.css";
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

const GoalPlanner = () => {
  const [goalAmount, setGoalAmount] = useState("1000000");
  const [years, setYears] = useState("10");
  const [expectedReturn, setExpectedReturn] = useState("12"); // User can adjust
  const [monthlyInvestment, setMonthlyInvestment] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    calculateInvestment();
  }, [goalAmount, years, expectedReturn]);

  const calculateInvestment = () => {
    const FV = parseFloat(goalAmount) || 0;
    const nYears = parseFloat(years) || 0;
    const annualReturn = parseFloat(expectedReturn) || 12;

    if (!FV || !nYears || FV <= 0 || nYears <= 0) {
      setMonthlyInvestment(null);
      setYearlyData([]);
      return;
    }

    const r = annualReturn / 100 / 12;
    const months = nYears * 12;

    // SIP formula: FV = P * [((1+r)^n - 1) / r] * (1 + r)
    // So, P = FV / ([((1+r)^n - 1) / r] * (1 + r))
    const denominator = ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const P = FV / denominator;

    const monthly = Math.max(0, P);
    const total = monthly * months;

    setMonthlyInvestment(monthly);
    setTotalInvested(total);
    setFutureValue(FV);

    // Generate growth projection for chart
    const data = [];
    let currentValue = 0;
    for (let y = 1; y <= nYears; y++) {
      const m = y * 12;
      currentValue = monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
      data.push({
        year: y,
        value: Math.round(currentValue),
        invested: Math.round(monthly * m),
      });
    }
    setYearlyData(data);
  };

  const suggestions = () => {
    if (!monthlyInvestment) return [];
    const tips = [];

    if (monthlyInvestment > 20000) {
      tips.push("💡 Consider increasing your time horizon to reduce monthly burden.");
    }

    const shorterYears = Math.max(1, Math.floor(parseFloat(years) * 0.8));
    const r = parseFloat(expectedReturn) / 100 / 12;
    const months2 = shorterYears * 12;
    const denom2 = ((Math.pow(1 + r, months2) - 1) / r) * (1 + r);
    const newSIP = parseFloat(goalAmount) / denom2;

    if (newSIP > monthlyInvestment * 1.3) {
      tips.push(`⚡ Starting ${Math.ceil(parseFloat(years) - shorterYears)} years early reduces your SIP by ₹${Math.round(monthlyInvestment - newSIP).toLocaleString("en-IN")}.`);
    }

    if (parseFloat(expectedReturn) < 10) {
      tips.push("📈 Historically, equity SIPs deliver 10–15% CAGR over 7+ years.");
    }

    return tips.length ? tips : ["🎯 Your goal is achievable with disciplined investing!"];
  };

  const AnimatedNumber = ({ value }) => (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="animated-number"
    >
      ₹{value.toLocaleString("en-IN")}
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="goal-wrapper">
        <div className="container">
          <div className="page-header">
            <span className="badge">Goal Planning</span>
            <h1 className="goal-title">Goal Planner</h1>
            <p className="goal-subtitle">
              Calculate how much to invest monthly to achieve your dream goals.
            </p>
          </div>

          <div className="goal-layout">
            {/* Inputs */}
            <div className="goal-card">
              <div className="goal-inputs">
                <div className="input-group">
                  <label>Goal Amount (₹)</label>
                  <input
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    min="10000"
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
                <div className="input-group">
                  <label>Expected Annual Return (%)</label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    min="1"
                    max="30"
                    step="0.5"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            {monthlyInvestment !== null && (
              <div className="results-section">
                {/* Metrics */}
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">Monthly SIP</div>
                    <AnimatedNumber value={Math.round(monthlyInvestment)} />
                  </div>
                  <div className="metric-card accent">
                    <div className="metric-label">Total Invested</div>
                    <AnimatedNumber value={Math.round(totalInvested)} />
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Goal Amount</div>
                    <AnimatedNumber value={Math.round(futureValue)} />
                  </div>
                </div>

                {/* Charts */}
                <div className="charts-row">
                  {/* Composition */}
                  <div className="chart-card">
                    <h3 className="chart-title">Wealth Composition</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Invested", value: totalInvested },
                            { name: "Returns", value: futureValue - totalInvested },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#6366F1" />
                          <Cell fill="#10B981" />
                        </Pie>
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Growth Timeline */}
                  <div className="chart-card">
                    <h3 className="chart-title">Wealth Growth Over Time</h3>
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
                          name="Projected Value"
                          stroke="#6366F1"
                          strokeWidth={3}
                          dot={{ r: 3 }}
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
                    {suggestions().map((tip, i) => (
                      <li key={i}>{tip}</li>
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

export default GoalPlanner;