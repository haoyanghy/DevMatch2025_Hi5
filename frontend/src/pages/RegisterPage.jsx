import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMetaMask } from 'metamask-react';
import "./RegisterLogin.css";

function RegisterPage({ setUser }) {
  const { status, connect, account } = useMetaMask();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    traderType: "" 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'connected' && account) {
      setWalletConnected(true);
      setError("");
    } else {
      setWalletConnected(false);
    }
  }, [status, account]);

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
      setError("Failed to connect to MetaMask. Please try again.");
    }
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.traderType) {
      setError("Please select your trading experience.");
      return;
    }

    if (!walletConnected) {
      setError("Please connect your MetaMask wallet first.");
      return;
    }

    setSubmitting(true);

    const user = {
      walletAddress: account,
      traderType: form.traderType,
      name: "Wallet User",
      id: account
    };

    // Store user data locally
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('walletAddress', account);
    localStorage.setItem('traderType', form.traderType);

    setUser(user);
    setSuccess("Registration successful! Redirecting to dashboard...");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="logo-icon">📈</div>
              <span>TradeMatch</span>
            </div>
            <h1>Create Your Account</h1>
            <p>Join thousands of successful traders on our platform</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                {error}
              </div>
            )}
            
            {success && (
              <div className="alert alert-success">
                <span className="alert-icon">✅</span>
                {success}
              </div>
            )}

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="traderType">Trading Experience</label>
                <div className="select-wrapper">
                  <select
                    id="traderType"
                    name="traderType"
                    value={form.traderType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your experience level</option>
                    <option value="Beginner">🌟 Beginner - New to trading</option>
                    <option value="Professional">🏆 Professional - Experienced trader</option>
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </div>
            </div>

            <div className="wallet-section">
              <label>MetaMask Wallet Connection</label>
              {!walletConnected ? (
                <button
                  type="button"
                  onClick={handleConnectWallet}
                  className="wallet-connect-btn"
                  disabled={status === 'connecting'}
                >
                  <span className="btn-icon">🔗</span>
                  {status === 'connecting' ? 'Connecting...' : 'Connect MetaMask Wallet'}
                </button>
              ) : (
                <div className="wallet-connected">
                  <div className="wallet-status">
                    <span className="status-icon">✅</span>
                    <div className="wallet-info">
                      <span className="wallet-label">Wallet Connected</span>
                      <span className="wallet-address">
                        {account?.slice(0, 8)}...{account?.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={submitting || !walletConnected}
            >
              <span className="btn-content">
                {submitting ? (
                  <>
                    <span className="spinner"></span>
                    Signing Up...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Sign Up
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-features">
          <h3>Why Choose TradeMatch?</h3>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h4>AI-Powered Matching</h4>
                <p>Get matched with traders that fit your exact profile</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <div>
                <h4>Secure Trading</h4>
                <p>Your funds remain in your control at all times</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <h4>Transparent Data</h4>
                <p>Full access to trader performance and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
