import React, { useState } from "react";
import "./EmiCalculator.css";

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(tenure) * 12;

    const emiCalc = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const emiRounded = Math.round(emiCalc);
    const totalAmt = emiRounded * N;
    const interest = totalAmt - P;

    setEmi(emiRounded);
    setTotalInterest(interest);
    setTotalPayment(totalAmt);
  };

  return (
    <div className="emi-wrapper">
      <h1>🧮 EMI Calculator</h1>
      <p>Calculate your monthly loan repayment with ease.</p>

      <div className="emi-form">
        <label>
          Loan Amount (₹)
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter loan amount"
          />
        </label>

        <label>
          Interest Rate (Annual %)
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="e.g. 9.5"
          />
        </label>

        <label>
          Tenure (in years)
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="e.g. 5"
          />
        </label>

        <button onClick={calculateEMI}>Calculate EMI</button>
      </div>

      {emi && (
        <div className="emi-result">
          <h2>📊 Results</h2>
          <p><strong>Monthly EMI:</strong> ₹{emi.toLocaleString()}</p>
          <p><strong>Total Interest:</strong> ₹{totalInterest.toLocaleString()}</p>
          <p><strong>Total Payment:</strong> ₹{totalPayment.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
