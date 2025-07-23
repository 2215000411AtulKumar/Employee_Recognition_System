import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header({ userRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="logo">🏆 Employee Recognition System</div>
      <div className="right-section">
        <span className="role-label">Logged in as: {userRole}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
