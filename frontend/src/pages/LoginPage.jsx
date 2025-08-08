import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterLogin.css";

function LoginPage({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    
    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", form);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      
      window.location.href = "/dashboard";
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Login failed. Invalid credentials."
      );
      setSubmitting(false);
    }
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
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                disabled={submitting}
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                disabled={submitting}
              />
            </label>
            
            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? "Logging in..." : "Log In"}
            </button>

            {error && <div className="auth-error">{error}</div>}

            <div className="auth-actions">
              <Link to="#" className="auth-link">Forgot password?</Link>
            </div>

            <div className="auth-actions">
              New user? <Link to="/register">Create account</Link>
            </div>
          </form>
          
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
