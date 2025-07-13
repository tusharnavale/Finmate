import React, { useState } from "react";
import "./SipCalculator.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


//this is sip calc for calculating SIP
const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [years, setYears] = useState("");
  const [futureValue, setFutureValue] = useState(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (!P || !r || !n) {
      setFutureValue("Please fill all fields correctly.");
      return;
    }

    const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setFutureValue(fv.toFixed(2));
  };

  return (
    <>
      <Navbar />
      <div className="sip-wrapper">
        <h1 className="sip-title">📈 SIP Calculator</h1>
        <p className="sip-subtitle">Estimate your future wealth from monthly SIPs</p>

        <div className="sip-card">
          <div className="sip-inputs">
            <label>Monthly Investment (₹)</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="e.g. 5000"
            />

            <label>Expected Annual Return (%)</label>
            <input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              placeholder="e.g. 12"
            />

            <label>Investment Duration (Years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g. 10"
            />

            <button className="sip-btn" onClick={calculateSIP}>
              Calculate
            </button>
          </div>

          {futureValue && (
            <div className="sip-result">
              <h3>Future Value 💰</h3>
              <p>₹ {futureValue}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SipCalculator;
