import { useEffect, useState } from "react";
import AdminReward from "./AdminReward";
import Leaderboard from "./Leaderboard";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("users");
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const fetchUsers = () => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    if (activePage === "users" || activePage === "reward") fetchUsers();
  }, [activePage]);

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("User deleted");
        fetchUsers();
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  const startEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/users/${editUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
      .then(() => {
        alert("User updated");
        setEditUser(null);
        fetchUsers();
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(async (res) => {
        const msg = await res.text();
        alert(msg);
        setNewUser({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
        setShowAddForm(false);
        fetchUsers();
      })
      .catch((err) => console.error("Error adding user:", err));
  };

  return (
    <div className="admin-container">
      <h2>👑 Admin Dashboard</h2>

      <div className="admin-nav-buttons">
        <button onClick={() => setActivePage("users")}>All Users</button>
        <button onClick={() => setActivePage("reward")}>Reward Employee</button>
        <button onClick={() => setActivePage("leaderboard")}>Leaderboard</button>
      </div>

      {activePage === "users" && (
        <>
          <h3>All Users</h3>
          <table border="1">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => startEdit(user)}>Edit</button>
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editUser && (
            <div className="edit-form">
              <h3>Edit User</h3>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  value={editUser.firstName}
                  onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={editUser.lastName}
                  onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="text"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  placeholder="Username"
                  required
                />
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  placeholder="Email"
                  required
                />
                <button type="submit">Update User</button>
                <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
              </form>
            </div>
          )}

          <button style={{ marginTop: "20px" }} onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Close Add User Form" : "Add User"}
          </button>

          {showAddForm && (
            <div className="edit-form">
              <h3>Add New User</h3>
              <form onSubmit={handleAddUser}>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  placeholder="Username"
                  required
                />
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Email"
                  required
                />
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Password"
                  required
                />
                <button type="submit">Add User</button>
              </form>
            </div>
          )}
        </>
      )}

      {activePage === "reward" && <AdminReward users={users} />}
      {activePage === "leaderboard" && <Leaderboard />}
    </div>
  );
}

export default AdminDashboard;
