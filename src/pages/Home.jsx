// Home.jsx
import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrainCircuit, Timer, Lock, Zap } from 'lucide-react';

const Home = () => {
  const [showBot, setShowBot] = useState(false);

  return (
    <>
      <Navbar />
      <main className="home-wrapper">
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <span className="badge">AI-Powered Finance Assistant</span>
              <h1>
                Make Smarter Financial Decisions <br />
                <span className="highlight">with FinMate</span>
              </h1>
              <p className="hero-desc">
                The only AI finance copilot that helps you plan investments, track goals, and optimize spending — instantly, securely, and for free.
              </p>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => setShowBot(true)}>
                  Start Free →
                </button>
                <button className="btn-secondary" onClick={() => setShowBot(true)}>
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot */}
        {showBot && (
          <div className="chatbot-container">
            <div className="container">
              <h2 className="section-heading">💬 FinMate AI Assistant</h2>
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/33F3jMa5761f1qFamzS8K"
                title="FinMate AI Chatbot"
              ></iframe>
            </div>
          </div>
        )}

        {/* Features */}
        <section className="features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why Finance Teams & Individuals Trust FinMate</h2>
              <p className="section-subtitle">
                Built for clarity, speed, and privacy — no fluff, just results.
              </p>
            </div>
            <div className="features-grid">
              {[
                {
                  icon: <BrainCircuit size={28} />,
                  title: "AI-Powered Insights",
                  desc: "Get personalized financial advice based on real-time market logic and your goals."
                },
                {
                  icon: <Timer size={28} />,
                  title: "Instant Calculations",
                  desc: "SIP, EMI, ROI, budgeting — all computed in seconds with zero setup."
                },
                {
                  icon: <Lock size={28} />,
                  title: "Bank-Grade Privacy",
                  desc: "No login. No data storage. Your inputs stay on your device — always."
                },
                {
                  icon: <Zap size={28} />,
                  title: "Frictionless UX",
                  desc: "Designed for students, professionals, and founders — no finance degree needed."
                }
              ].map((feature, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How FinMate Works</h2>
              <p className="section-subtitle">
                Three steps to financial clarity.
              </p>
            </div>
            <div className="steps">
              {[
                { step: "01", title: "Ask", desc: "Describe your goal: 'How much to save for a car?'" },
                { step: "02", title: "Analyze", desc: "AI cross-checks 100+ financial models in real-time." },
                { step: "03", title: "Act", desc: "Get a clear, actionable plan with next steps." }
              ].map((item, i) => (
                <div className="step-card" key={i}>
                  <div className="step-number">{item.step}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Loved by Users Across India</h2>
            </div>
            <div className="testimonial-grid">
              {[
                { quote: "FinMate cut my financial planning time from hours to minutes.", name: "Ramesh S.", role: "Founder, Mumbai" },
                { quote: "Finally, a tool that explains finance in plain English!", name: "Priya M.", role: "Student, Pune" },
                { quote: "I use it daily to track my SIPs and expenses. Game-changer.", name: "Aarav G.", role: "Engineer, Delhi" }
              ].map((t, i) => (
                <div className="testimonial-card" key={i}>
                  <p>“{t.quote}”</p>
                  <div className="testimonial-author">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="container">
            <h2>Ready to Take Control of Your Financial Future?</h2>
            <p>Join thousands who use FinMate daily — free forever, no strings attached.</p>
            <button className="btn-primary-lg" onClick={() => setShowBot(true)}>
              Get Started Now →
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;