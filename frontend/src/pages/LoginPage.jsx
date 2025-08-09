import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMetaMask } from 'metamask-react';
import "./RegisterLogin.css";

function LoginPage({ setUser }) {
  const { status, connect, account } = useMetaMask();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location.state]);

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
      setError("");
      await connect();
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
      setError("Failed to connect to MetaMask. Please try again.");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!walletConnected) {
      setError("Please connect your MetaMask wallet first.");
      return;
    }

    setSubmitting(true);

    // No backend - just simulate login and redirect
    const user = {
      walletAddress: account,
      name: "Wallet User",
      id: account
    };

    // Store user data locally
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('walletAddress', account);

    setUser(user);
    setSuccess("Login successful! Redirecting to dashboard...");

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
              <span>MirrorTrade</span>
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your trading journey</p>
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
                    Signing In...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🔑</span>
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one here
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-features">
          <h3>Secure Login</h3>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <div>
                <h4>Bank-Level Security</h4>
                <p>Your account is protected with advanced encryption</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <h4>Instant Access</h4>
                <p>Get immediate access to your trading dashboard</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <div>
                <h4>Multi-Device Sync</h4>
                <p>Access your account from any device, anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
