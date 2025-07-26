import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrainCircuit, Timer, LockOpen, Zap } from 'lucide-react';


//add a commit
//add a 2nd commit
const Home = () => {
  const [showBot, setShowBot] = useState(false);

  return (
    <>
      <Navbar />
      <main className="home-wrapper">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-left">
            <h1>
              Smarter Financial Decisions <br /> with <span className="green">FinMate</span>
            </h1>
            <p className="hero-desc">
              Your AI-powered personal finance buddy. Plan your investments, track your goals, and make confident money moves in minutes.
            </p>
            <button className="start-btn" onClick={() => setShowBot(true)}>🚀 Start Now</button>
          </div>
        </section>

        {/* Chatbot Embed */}
        {showBot && (
          <div className="chatbot-container">
            <h2 className="chatbot-title">💬 FinMate AI Chat Assistant</h2>
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/33F3jMa5761f1qFamzS8K"
              title="FinMate AI Chatbot"
            ></iframe>
          </div>
        )}

        {/* Features Section */}
        <section className="features">
          <h2 className="section-title">Why FinMate?</h2>
          <div className="features-grid">
            <div className="feature-box">
              <BrainCircuit size={48} color="#1db954" />
              <h3>AI-Powered Insights</h3>
              <p>Get intelligent suggestions and smart insights tailored to your goals.</p>
            </div>
            <div className="feature-box">
              <Timer size={48} color="#1db954" />
              <h3>Real-Time Planning</h3>
              <p>Instant calculations on SIPs, EMIs, goals, and budgeting – all under one roof.</p>
            </div>
            <div className="feature-box">
              <LockOpen size={48} color="#1db954" />
              <h3>No Login Required</h3>
              <p>Use FinMate without creating an account. Your privacy is our priority.</p>
            </div>
            <div className="feature-box">
              <Zap size={48} color="#1db954" />
              <h3>Simple Yet Powerful</h3>
              <p>Clean interface and intuitive flow. Designed for everyone.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <h2 className="section-title">How it works</h2>
          <div className="steps">
            <div className="step">
              <div className="circle">1</div>
              <h4>Ask</h4>
              <p>Describe your financial goal or problem.</p>
            </div>
            <div className="step">
              <div className="circle">2</div>
              <h4>Analyze</h4>
              <p>Our AI processes your inputs using smart logic.</p>
            </div>
            <div className="step">
              <div className="circle">3</div>
              <h4>Act</h4>
              <p>Get actionable advice instantly and start implementing.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials">
          <h2 className="section-title">What users say</h2>
          <div className="testimonial-list">
            <div className="testimonial">
              <p>“FinMate simplified my investments — I love how fast it works!”</p>
              <span>- Ramesh S, Mumbai</span>
            </div>
            <div className="testimonial">
              <p>“No more spreadsheets! This tool gave me clarity in 5 mins.”</p>
              <span>- Priya M, Pune</span>
            </div>
            <div className="testimonial">
              <p>“Beautiful interface and very intuitive. Game changer for students.”</p>
              <span>- Aarav G, Delhi</span>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="faq-section">
          <h2 className="section-title">FAQs</h2>
          <div className="faq-list">
            <div className="faq">
              <h4>Is FinMate free to use?</h4>
              <p>Yes, completely free with no sign-up required.</p>
            </div>
            <div className="faq">
              <h4>Can I use it on mobile?</h4>
              <p>Absolutely. FinMate is mobile responsive and works on any device.</p>
            </div>
            <div className="faq">
              <h4>How secure is my data?</h4>
              <p>Your data never leaves your device — privacy is our top priority.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>Ready to take control of your money?</h2>
          <p>FinMate is your pocket advisor, always available and free to use.</p>
          <button className="start-btn-lg" onClick={() => setShowBot(true)}>Start Now</button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
