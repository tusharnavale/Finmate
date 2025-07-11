import React, { useState } from "react";
import "./BudgetPlanner.css";

const BudgetPlanner = () => {
  const [income, setIncome] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = () => {
    if (expenseTitle && expenseAmount) {
      const newExpense = {
        title: expenseTitle,
        amount: parseFloat(expenseAmount),
      };
      setExpenses([...expenses, newExpense]);
      setExpenseTitle("");
      setExpenseAmount("");
    }
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - totalExpense;

  return (
    <div className="budget-wrapper">
      <h1>📊 Budget Planner</h1>
      <p>Track your income, spending, and savings in one place.</p>

      <div className="budget-section">
        <label>
          Monthly Income (₹)
          <input
            type="number"
            placeholder="Enter your income"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </label>

        <div className="add-expense">
          <input
            type="text"
            placeholder="Expense Title"
            value={expenseTitle}
            onChange={(e) => setExpenseTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />
          <button onClick={handleAddExpense}>Add</button>
        </div>
      </div>

      <div className="summary">
        <div><strong>💸 Total Expenses:</strong> ₹{totalExpense.toLocaleString()}</div>
        <div><strong>💼 Balance Left:</strong> ₹{balance.toLocaleString()}</div>
      </div>

      <h3>📋 Expense List</h3>
      <ul className="expense-list">
        {expenses.map((exp, index) => (
          <li key={index}>
            {exp.title} — ₹{exp.amount.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPlanner;
