// ✅ Correct Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer style={{
      textAlign: "center",
      padding: "20px",
      background: "#f1f1f1",
      color: "#555"
    }}>
      © {new Date().getFullYear()} FinMate. All rights reserved.
    </footer>
  );
};

export default Footer; // ✅ THIS LINE IS REQUIRED for default import
