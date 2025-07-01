import { useEffect, useState } from "react";
import "../styles/EmployeeDashboard.css";

function EmployeeDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("employee"));
    if (storedUser && storedUser._id) {
      fetch(`http://localhost:5000/user/${storedUser._id}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error("Error:", err));
    }
  }, []);

  const totalPoints = user?.rewards?.reduce((acc, reward) => acc + reward.points, 0) || 0;

  return (
    <div className="employee-container">
      <h2>Employee Dashboard</h2>
      {user ? (
        <>
          <div className="profile-card">
            <h3>Welcome, {user.firstName} {user.lastName} 👋</h3>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Total Points:</strong> {totalPoints}</p>
          </div>

          <AchievementsSection points={totalPoints} />

          <div className="stats-section">
            <h3>📊 Your Stats</h3>
            <p>Total Rewards: {user.rewards?.length || 0}</p>
            <p>Total Points: {totalPoints}</p>
          </div>

          <div className="rewards-section">
            <h3>🎁 Your Rewards Timeline</h3>
            {user.rewards && user.rewards.length > 0 ? (
              user.rewards.map((reward, idx) => (
                <div key={idx} className="reward-card">
                  <h4>{reward.title}</h4>
                  <p>{reward.message}</p>
                  <p><strong>Points:</strong> {reward.points}</p>
                  <p><strong>Date:</strong> {new Date(reward.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No rewards yet.</p>
            )}
          </div>

            <div className="leaderboard-link">
              <a href="/leaderboard">View Leaderboard</a>
            </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

function AchievementsSection({ points }) {
  let badge = "No Badge Yet 🟢";
  if (points >= 200) badge = "🏆 Platinum Performer";
  else if (points >= 100) badge = "🥇 Gold Achiever";
  else if (points >= 50) badge = "🥈 Silver Star";

  return (
    <div className="achievements-section">
      <h3>🏅 Achievements</h3>
      <p>Current Badge: <strong>{badge}</strong></p>
      <p>Earn more points to unlock higher badges!</p>
    </div>
  );
}

export default EmployeeDashboard;
