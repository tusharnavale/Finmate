import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">💡 Fin<span className="green">Mate</span></Link>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tools">Tools</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
