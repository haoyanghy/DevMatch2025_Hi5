import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      await fakeRegisterApi(form); 
      setWalletStatus("creating");

      await new Promise(res => setTimeout(res, 1000)); 
      setWalletStatus("created");

      setTimeout(() => {
        navigate("/login", {
          state: { email: form.email }, 
        });
      }, 1200); 

    } catch (err) {
      setError("Registration failed. Please try again.");
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
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={walletStatus !== "idle"}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={walletStatus !== "idle"}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                disabled={walletStatus !== "idle"}
              />
            </label>

            {walletStatus === "creating" && (
              <div className="wallet-loader">Creating your wallet…</div>
            )}
            {walletStatus === "created" && (
              <div className="wallet-success">Wallet created <span>✔</span></div>
            )}
            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="auth-submit"
              disabled={walletStatus !== "idle" || submitting}
            >
              Sign Up
            </button>
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
