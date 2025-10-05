// Tools.jsx
import React from "react";
import "./Tools.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calculator, TrendingUp, Target, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Tools = () => {
  const tools = [
    {
      icon: <TrendingUp size={28} className="tool-icon-svg" />,
      title: "SIP Calculator",
      desc: "Plan your mutual fund investments with precision and confidence.",
      link: "/sip",
    },
    {
      icon: <Wallet size={28} className="tool-icon-svg" />,
      title: "EMI Calculator",
      desc: "Estimate your monthly loan payments instantly and accurately.",
      link: "/emi",
    },
    {
      icon: <Calculator size={28} className="tool-icon-svg" />,
      title: "Budget Planner",
      desc: "Track income, control expenses, and build smarter saving habits.",
      link: "/budget",
    },
    {
      icon: <Target size={28} className="tool-icon-svg" />,
      title: "Goal Planner",
      desc: "Calculate exactly how much to invest to hit your future goals.",
      link: "/goal",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="tools-wrapper">
        <div className="container">
          <div className="tools-header">
            <span className="section-badge">Powerful Finance Tools</span>
            <h1 className="tools-title">Your Financial Toolkit</h1>
            <p className="tools-subtitle">
              All-in-one suite of calculators built for clarity, speed, and smart decisions.
            </p>
          </div>

          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div className="tool-card" key={index}>
                <div className="tool-icon">{tool.icon}</div>
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
                <Link to={tool.link} className="tool-link">
                  Try Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tools;