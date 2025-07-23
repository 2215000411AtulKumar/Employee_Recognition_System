import { useState, useEffect } from "react";
import Leaderboard from "./leaderboard";
import "../styles/employeeDashboard.css";
import Header from "../components/Header";


function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [activePage, setActivePage] = useState("profile");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    fetch(`http://localhost:5000/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data))
      .catch((err) => {
        console.error("Failed to fetch employee data:", err);
        setEmployee({});
      });
  }, []);

  if (!employee) return <div>Loading employee data...</div>;

  return (
    <div className="employee-container">
      <Header userRole="employee" />

      <div className="employee-nav-buttons">
        <button onClick={() => setActivePage("profile")}>My Profile</button>
        <button onClick={() => setActivePage("leaderboard")}>Leaderboard</button>
      </div>

      {activePage === "profile" && (
        <div className="profile-card">
          <h3>👤 Profile Information</h3>
          <p><strong>First Name:</strong> {employee.firstName}</p>
          <p><strong>Last Name:</strong> {employee.lastName}</p>
          <p><strong>Username:</strong> {employee.username}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Points / Rewards:</strong> {employee.points || 0}</p>
        </div>
      )}

      {activePage === "leaderboard" && <Leaderboard />}
    </div>
  );
}

export default EmployeeDashboard;
