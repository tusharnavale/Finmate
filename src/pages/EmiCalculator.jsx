// EmiCalculator.jsx
import React, { useState, useEffect } from "react";
import "./EmiCalculator.css";
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

const COLORS = ["#6366F1", "#F43F5E"]; // Indigo (principal) + Rose (interest)

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("9.5");
  const [tenure, setTenure] = useState("5");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [amortizationData, setAmortizationData] = useState([]);

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure]);

  const calculateEMI = () => {
    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const years = parseFloat(tenure) || 0;

    if (!P || !annualRate || !years || P <= 0 || annualRate <= 0 || years <= 0) {
      setEmi(null);
      setAmortizationData([]);
      return;
    }

    const R = annualRate / 12 / 100;
    const N = years * 12;

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const emiRounded = Math.round(emiValue);
    const total = emiRounded * N;
    const interest = total - P;

    setEmi(emiRounded);
    setTotalInterest(interest);
    setTotalPayment(total);

    // Generate amortization data for chart
    const data = [];
    let balance = P;
    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    for (let month = 1; month <= N; month++) {
      const interestThisMonth = balance * R;
      const principalThisMonth = emiRounded - interestThisMonth;
      balance -= principalThisMonth;
      cumulativeInterest += interestThisMonth;
      cumulativePrincipal += principalThisMonth;

      if (month % 12 === 0 || month === N) {
        data.push({
          year: Math.ceil(month / 12),
          interest: Math.round(cumulativeInterest),
          principal: Math.round(cumulativePrincipal),
        });
      }
    }
    setAmortizationData(data);
  };

  const suggestions = () => {
    if (!emi) return [];
    const list = [];

    if (parseFloat(rate) > 10) {
      list.push("💡 Consider balance transfer to a lower-interest loan.");
    }

    const shorterTenure = Math.max(1, Math.floor(parseFloat(tenure) * 0.8));
    const R = parseFloat(rate) / 12 / 100;
    const N2 = shorterTenure * 12;
    const P = parseFloat(principal);
    const newEmi = (P * R * Math.pow(1 + R, N2)) / (Math.pow(1 + R, N2) - 1);
    const newTotal = Math.round(newEmi) * N2;
    const savings = totalPayment - newTotal;

    if (savings > 50000) {
      list.push(`⚡ Reduce tenure to ${shorterTenure} years to save ₹${savings.toLocaleString("en-IN")}.`);
    }

    return list;
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
      <div className="emi-wrapper">
        <div className="container">
          <div className="page-header">
            <span className="badge">Loan Planning</span>
            <h1 className="emi-title">EMI Calculator</h1>
            <p className="emi-subtitle">
              Understand your loan repayment schedule and interest burden.
            </p>
          </div>

          <div className="emi-layout">
            {/* Inputs */}
            <div className="emi-card">
              <div className="emi-inputs">
                <div className="input-group">
                  <label>Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    min="10000"
                  />
                </div>
                <div className="input-group">
                  <label>Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    min="1"
                    max="30"
                  />
                </div>
                <div className="input-group">
                  <label>Tenure (Years)</label>
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            {emi && (
              <div className="results-section">
                {/* Metrics */}
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">Monthly EMI</div>
                    <AnimatedNumber value={emi} />
                  </div>
                  <div className="metric-card accent">
                    <div className="metric-label">Total Interest</div>
                    <AnimatedNumber value={totalInterest} />
                  </div>
                  <div className="metric-card">
                    <div className="metric-label">Total Payment</div>
                    <AnimatedNumber value={totalPayment} />
                  </div>
                </div>

                {/* Charts */}
                <div className="charts-row">
                  {/* Composition */}
                  <div className="chart-card">
                    <h3 className="chart-title">Loan Breakdown</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Principal", value: parseFloat(principal) },
                            { name: "Interest", value: totalInterest },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill={COLORS[0]} />
                          <Cell fill={COLORS[1]} />
                        </Pie>
                        <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Amortization Trend */}
                  <div className="chart-card">
                    <h3 className="chart-title">Cumulative Payment Over Time</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={amortizationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
                        <YAxis
                          stroke="#64748B"
                          fontSize={12}
                          tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Amount"]}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="principal"
                          name="Principal Repaid"
                          stroke="#6366F1"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="interest"
                          name="Interest Paid"
                          stroke="#F43F5E"
                          strokeWidth={3}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="suggestions-card">
                  <h3 className="suggestions-title">💡 Smart Tips</h3>
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

export default EmiCalculator;