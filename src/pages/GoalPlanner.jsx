import React, { useState } from "react";
import "./GoalPlanner.css";

const GoalPlanner = () => {
  const [goalAmount, setGoalAmount] = useState("");
  const [years, setYears] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState(null);

  const calculateInvestment = () => {
    const principal = parseFloat(goalAmount);
    const n = parseFloat(years);
    const r = 0.12 / 12; // 12% annual return assumed

    const months = n * 12;
    const investment =
      (principal * r) / (Math.pow(1 + r, months) - 1);

    setMonthlyInvestment(investment.toFixed(2));
  };

  return (
    <div className="goal-wrapper">
      <h1>🎯 Goal Planner</h1>
      <p>Plan your future goals with smart monthly investments.</p>

      <div className="goal-form">
        <input
          type="number"
          placeholder="Goal Amount (₹)"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
        />
        <button onClick={calculateInvestment}>Calculate</button>
      </div>

      {monthlyInvestment && (
        <div className="goal-result">
          <h3>📅 Monthly Investment Needed:</h3>
          <p>₹{monthlyInvestment} per month</p>
          <span>(Assuming 12% annual return)</span>
        </div>
      )}
    </div>
  );
};

export default GoalPlanner;


