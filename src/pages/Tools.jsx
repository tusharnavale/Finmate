import React from "react";
import "./Tools.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calculator, TrendingUp, Target, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Tools = () => {
  const tools = [
    {
      icon: <TrendingUp size={40} color="#1db954" />,
      title: "SIP Calculator",
      desc: "Plan your mutual fund investments smartly.",
      link: "/sip",
    },
    {
      icon: <Wallet size={40} color="#1db954" />,
      title: "EMI Calculator",
      desc: "Know your monthly loan repayments easily.",
      link: "/emi",
    },
    {
      icon: <Calculator size={40} color="#1db954" />,
      title: "Budget Planner",
      desc: "Track income, expenses & save more every month.",
      link: "/budget",
    },
    {
      icon: <Target size={40} color="#1db954" />,
      title: "Goal Planner",
      desc: "Calculate how much to invest for future goals.",
      link: "/goal", // ✅ Updated here
    },
  ];

  return (
    <>
      <Navbar />
      <div className="tools-wrapper">
        <h1 className="tools-title">💼 Finance Tools</h1>
        <p className="tools-subtitle">
          Plan smartly with FinMate’s quick calculators
        </p>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <div className="tool-card" key={index}>
              <div className="tool-icon">{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
              <Link to={tool.link}>
                <button className="tool-btn">Try Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tools;
