// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            💡 <span className="brand-name">Fin<span className="brand-accent">Mate</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/tools" onClick={() => setIsMenuOpen(false)}>Tools</Link>
          <button 
            className="btn-cta" 
            onClick={() => {
              setIsMenuOpen(false);
              // Optional: trigger chatbot or scroll to CTA
              window.dispatchEvent(new Event('open-chatbot'));
            }}
          >
            Start Free
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={isMenuOpen ? "line open" : "line"}></span>
          <span className={isMenuOpen ? "line open" : "line"}></span>
          <span className={isMenuOpen ? "line open" : "line"}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/tools" onClick={toggleMenu}>Tools</Link>
          <button 
            className="btn-cta-mobile"
            onClick={() => {
              toggleMenu();
              window.dispatchEvent(new Event('open-chatbot'));
            }}
          >
            Start Free
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;