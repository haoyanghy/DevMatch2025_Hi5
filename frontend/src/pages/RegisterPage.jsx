import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterLogin.css";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [walletStatus, setWalletStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    setSubmitting(true);

    try {
      await axios.post("http://localhost:8000/api/register", form);

      setWalletStatus("creating");
      await new Promise(res => setTimeout(res, 1000));
      setWalletStatus("created");
      setTimeout(() => {
        navigate("/login", { state: { email: form.email } });
      }, 1200);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-card-main">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Name
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                disabled={submitting}
              />
            </label>
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
              {submitting ? "Registering..." : "Register"}
            </button>

            {walletStatus === "creating" && (
              <div className="wallet-msg">Creating wallet...</div>
            )}
            {walletStatus === "created" && (
              <div className="wallet-msg success">Wallet created!</div>
            )}
            {error && <div className="error-msg">{error}</div>}

          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <div className="auth-card-side">
          <h4>Security Tips</h4>
          <ul className="auth-tips">
            <li>Write down and securely store your wallet’s seed phrase.</li>
            <li>Never share your password or private keys.</li>
            <li>Use strong and unique credentials for best security.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

async function fakeRegisterApi(form) {
  return new Promise((resolve) => setTimeout(resolve, 800));
}

export default RegisterPage;
