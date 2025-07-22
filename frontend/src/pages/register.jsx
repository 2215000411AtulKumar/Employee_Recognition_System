import '../styles/LoginRegister.css'

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: e.target.first_name.value,
      lastName: e.target.last_name.value,
      username: e.target.username.value,
      email: e.target.register_email.value,
      password: e.target.register_password.value,
    };

    // Confirm password check
    if (data.password !== e.target.confirm_password.value) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const msg = await response.text();
    alert(msg);

    e.target.reset();
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="register_email">Email</label>
            <input type="email" id="register_email" name="register_email" required />
          </div>
          <div className="form-group">
            <label htmlFor="register_password">Password</label>
            <input type="password" id="register_password" name="register_password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" name="confirm_password" required />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="register-footer">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
