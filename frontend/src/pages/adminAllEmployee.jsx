import { useEffect, useState } from "react";
import "../styles/adminAllEmployees.css";

function AdminAllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard") // Assuming same endpoint
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error("Error fetching employees:", err));
  }, []);

  return (
    <div className="all-employees-container">
      <h2>👥 All Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Points</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.points}</td>
              <td>{emp.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAllEmployees;
