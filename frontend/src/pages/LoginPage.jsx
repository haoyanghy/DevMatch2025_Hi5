import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-card-main">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </label>
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="auth-submit">Log In</button>
          </form>
          <div className="auth-actions">
            <Link to="#" className="auth-link">Forgot password?</Link>
          </div>
          <p className="auth-footer">
            New user? <Link to="/register">Create account</Link>
          </p>
        </div>
        <div className="auth-card-side">
          <h4>Secure Login</h4>
          <ul className="auth-tips">
            <li>Only enter your password on the official website.</li>
            <li>Never share your credentials or wallet data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
