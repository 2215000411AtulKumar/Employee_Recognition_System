import { useState } from "react";

function AdminReward({ users }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [points, setPoints] = useState("");

  const handleReward = async (e) => {
    e.preventDefault();

    const user = users.find((u) => u.username === selectedUser);
    if (!user) {
      alert("User not found!");
      return;
    }

    const data = {
      title: "Points Reward",
      message: `Congrats ${user.firstName}, you got ${points} points!`,
      points: Number(points),
    };

    const response = await fetch(`http://localhost:5000/reward/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const msg = await response.text();
    alert(msg);

    setSelectedUser("");
    setPoints("");
  };

  return (
    <div className="edit-form">
      <h3>Reward Employee</h3>
      <form onSubmit={handleReward}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="">Select Employee</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.firstName} {user.lastName} ({user.username})
            </option>
          ))}
        </select>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Points"
          required
        />
        <button type="submit">Reward</button>
      </form>
    </div>
  );
}

export default AdminReward;
