import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import SipCalculator from "./pages/Sipcalculator";
import EmiCalculator from "./pages/EmiCalculator";
import BudgetPlanner from "./pages/BudgetPlanner";
import GoalPlanner from "./pages/GoalPlanner";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/sip" element={<SipCalculator />} />
        <Route path="/emi" element={<EmiCalculator />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/goal" element={<GoalPlanner />} />
      </Routes>
    </Router>
  );
};

export default App;
