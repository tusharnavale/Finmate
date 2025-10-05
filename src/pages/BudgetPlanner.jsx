// BudgetPlanner.jsx
import React, { useState, useEffect } from "react";
import "./BudgetPlanner.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const DEFAULT_CATEGORIES = [
  "Housing", "Food", "Transport", "Entertainment", "Shopping", "Health", "Other"
];

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316"];

const BudgetPlanner = () => {
  const [income, setIncome] = useState("50000");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [expenses, setExpenses] = useState([
    { title: "Rent", amount: 15000, category: "Housing" },
    { title: "Groceries", amount: 8000, category: "Food" },
    { title: "Fuel", amount: 3000, category: "Transport" },
  ]);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = parseFloat(income) - totalExpense;
  const savingsRate = income > 0 ? ((balance / parseFloat(income)) * 100).toFixed(1) : 0;

  // Group expenses by category for chart
  const categoryData = DEFAULT_CATEGORIES.map((cat, index) => {
    const amt = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: cat, value: amt, color: COLORS[index] };
  }).filter(item => item.value > 0);

  const handleAddExpense = () => {
    if (expenseTitle && expenseAmount && income) {
      const newExpense = {
        title: expenseTitle,
        amount: parseFloat(expenseAmount),
        category: expenseCategory,
      };
      setExpenses([...expenses, newExpense]);
      setExpenseTitle("");
      setExpenseAmount("");
    }
  };

  const suggestions = () => {
    const tips = [];
    if (balance < 0) {
      tips.push("⚠️ You're overspending! Consider reducing non-essential expenses.");
    } else if (parseFloat(savingsRate) < 20) {
      tips.push("💡 Aim to save at least 20% of your income for financial health.");
    }

    const foodSpent = categoryData.find(d => d.name === "Food")?.value || 0;
    if (foodSpent > parseFloat(income) * 0.3) {
      tips.push("🍽️ You're spending over 30% on food — try meal prepping to cut costs.");
    }

    if (expenses.length === 0) {
      tips.push("✨ Add your first expense to get personalized insights!");
    }

    return tips.length ? tips : ["🎯 Great job! Your budget is well-balanced."];
  };

  const AnimatedNumber = ({ value, isCurrency = true }) => (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="animated-number"
    >
      {isCurrency ? `₹${value.toLocaleString("en-IN")}` : `${value}%`}
    </motion.div>
  );

  return (
    <>
      <Navbar />
      <div className="budget-wrapper">
        <div className="container">
          <div className="page-header">
            <span className="badge">Personal Finance</span>
            <h1 className="budget-title">Budget Planner</h1>
            <p className="budget-subtitle">
              Track income, control spending, and build smarter saving habits.
            </p>
          </div>

          <div className="budget-layout">
            {/* Input Section */}
            <div className="budget-card">
              <div className="income-input">
                <label>Monthly Income (₹)</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  min="0"
                />
              </div>

              <div className="add-expense-form">
                <input
                  type="text"
                  placeholder="Expense Title"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                />
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                >
                  {DEFAULT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                />
                <button onClick={handleAddExpense}>+ Add Expense</button>
              </div>

              {/* Expense List */}
              <div className="expense-list-section">
                <h3 className="list-title">Recent Expenses</h3>
                <ul className="expense-list">
                  {expenses.slice(-5).map((exp, i) => (
                    <li key={i}>
                      <span className="expense-title">{exp.title}</span>
                      <span className="expense-amount">₹{exp.amount.toLocaleString("en-IN")}</span>
                      <span className="expense-category">{exp.category}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results & Charts */}
            <div className="results-section">
              {/* Summary Metrics */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-label">Total Income</div>
                  <AnimatedNumber value={parseFloat(income) || 0} />
                </div>
                <div className="metric-card accent">
                  <div className="metric-label">Total Expenses</div>
                  <AnimatedNumber value={totalExpense} />
                </div>
                <div className="metric-card">
                  <div className="metric-label">Savings Rate</div>
                  <AnimatedNumber value={savingsRate} isCurrency={false} />
                </div>
              </div>

              {/* Charts */}
              <div className="charts-row">
                {/* Expense Breakdown */}
                <div className="chart-card">
                  <h3 className="chart-title">Spending by Category</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Income vs Expense Bar */}
                <div className="chart-card">
                  <h3 className="chart-title">Income vs Spending</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ name: "Budget", income: parseFloat(income), expense: totalExpense }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `₹${(v/1000)}k`} />
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />
                      <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" name="Expenses" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Smart Insights */}
              <div className="suggestions-card">
                <h3 className="suggestions-title">💡 Budget Insights</h3>
                <ul>
                  {suggestions().map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BudgetPlanner;