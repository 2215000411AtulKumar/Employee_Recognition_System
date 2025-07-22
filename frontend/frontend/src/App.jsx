import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import EmployeeDashboard from "./pages/employeeDashboard.jsx";
import Leaderboard from "./pages/leaderboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

      </Routes>
    </Router>
  );
}

export default App;