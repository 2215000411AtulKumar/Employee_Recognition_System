import '../styles/LoginRegister.css'
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target['login-email'].value,
            password: e.target['login-password'].value,
        };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Try to parse JSON, even for error responses
            const result = await response.json();

            if (response.ok && result.userId) {
                localStorage.setItem("userId", result.userId);
                localStorage.setItem("role", result.role);
                alert(result.message);
                
                if(result.role === "admin") navigate("/admin");
                else navigate("/employee");
            } else {
                alert(result.message || "Login failed");
            }
        } catch (err) {
            alert("An error occurred during login.");
            console.error(err);
        }

        e.target.reset(); // Reset the form after submission
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email:</label>
                        <input type="email" id="login-email" name="login-email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-password">Password:</label>
                        <input type="password" id="login-password" name="login-password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link> </p>
            </div>
        </div>
    )
}

export default Login;