import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterLogin.css";

function LoginPage({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState(null);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const navigate = useNavigate();

  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  };

  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  const checkMetaMaskConnection = async () => {
    if (isMetaMaskInstalled()) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setMetamaskAccount(accounts[0]);
          setIsMetamaskConnected(true);
        }
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
      }
    }
  };

  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled()) {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    try {
      setError("");
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length > 0) {
        setMetamaskAccount(accounts[0]);
        setIsMetamaskConnected(true);
        setError("");
      }
    } catch (error) {
      if (error.code === 4001) {
        setError("Please connect to MetaMask to continue.");
      } else {
        setError("Failed to connect to MetaMask. Please try again.");
      }
      console.error("MetaMask connection error:", error);
    }
  };

  const disconnectMetaMask = () => {
    setMetamaskAccount(null);
    setIsMetamaskConnected(false);
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isMetamaskConnected) {
      setError("Please connect your MetaMask wallet first.");
      return;
    }

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    
    setSubmitting(true);

    try {

      const loginData = {
        ...form,
        walletAddress: metamaskAccount
      };

      const response = await axios.post("http://localhost:8000/api/login", form);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      setUser(response.data.user);
      
      window.location.href = "/dashboard";
      
    } catch (err) {
      if (err.response?.status === 404 && err.response?.data?.message?.includes("wallet")) {
        setError("No account found with this MetaMask wallet. Please register first.");
      } else {
        setError(
          err.response?.data?.message || "Login failed. Invalid credentials."
        );
      }
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-card-main">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                disabled={!isMetamaskConnected || submitting}
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={!isMetamaskConnected || submitting}
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="auth-submit"
              disabled={submitting || !isMetamaskConnected}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>

            <div className="auth-actions">
              <Link to="#" className="auth-link">Forgot password?</Link>
            </div>

            {/* Register Link */}
            <p className="auth-actions">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>

        <div className="auth-card-side">
          <h4>Secure Login</h4>
          <ul className="auth-tips">
            <li>Only enter your password on the official website.</li>
            <li>Never share your credentials or wallet data.</li>
          </ul>

          {/* MetaMask Connection Section */}
            <div className="metamask-section">
              <hr className="divider" />
              <h3>Connect MetaMask Wallet</h3>
              {!isMetaMaskInstalled() ? (
                <div className="metamask-warning">
                  <p>MetaMask is not installed. Please install MetaMask extension to continue.</p>
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="install-metamask-btn"
                  >
                    Install MetaMask
                  </a>
                </div>
              ) : (
                <div className="metamask-connection">
                  {!isMetamaskConnected ? (
                    <button 
                      type="button" 
                      onClick={connectMetaMask}
                      className="connect-metamask-btn"
                      disabled={submitting}
                    >
                      Connect MetaMask Wallet
                    </button>
                  ) : (
                    <div className="metamask-connected">
                      <div className="wallet-info">
                        <span className="wallet-status">✅ Wallet Connected </span>
                        <span className="wallet-address">
                          {metamaskAccount?.slice(0, 6)}...{metamaskAccount?.slice(-4)}
                        </span>
                      </div>
                      <button 
                        type="button" 
                        onClick={disconnectMetaMask}
                        className="disconnect-btn"
                        disabled={submitting}
                      >
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>

      </div>
    </div>
  );
}

  
export default LoginPage;
