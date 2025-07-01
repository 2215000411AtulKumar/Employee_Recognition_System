import { useEffect, useState } from "react";
import "../styles/Leaderboard.css";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/leaderboard") // ⭐ Change URL to /leaderboard
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏆 Employee Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Email</th>
            <th>Points</th>
            <th>Medal</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.points || 0}</td>
              <td>
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🎖️"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
