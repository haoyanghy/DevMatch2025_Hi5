import { Link, useNavigate } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ onUserChange, user }) {
  const { status, account, chainId } = useMetaMask();
  const navigate = useNavigate();

  const handleDisconnect = async () => {
    try {
      onUserChange?.(null);
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('traderType');
      sessionStorage.clear();
      
      if (window.ethereum && window.ethereum.request) {
        try {
          await window.ethereum.request({
            method: 'wallet_revokePermissions',
            params: [{ eth_accounts: {} }],
          });
        } catch (revokeError) {
          console.log('Revoke permissions not supported or failed:', revokeError);
        }
      }

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Disconnect error:', error);
      navigate('/'); 
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-logo">
          MirrorTrade
        </Link>
      </div>

      {/* Only show navigation links when user is logged in AND wallet connected */}
      {user && status === 'connected' && account && (
        <ul className="navbar-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/learn">Learn</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      )}

      <div className="navbar-cta">
        {user && status === 'connected' && account ? (
          // Show user profile when user is logged in AND wallet connected
          <div className="user-profile">
            <span className="user-name">
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Wallet User'}
            </span>
            <button className="logout-btn" onClick={handleDisconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          // Show Register and Login buttons when user is NOT logged in
          <div className="auth-buttons">
            <Link to="/login" className="nav-btn login-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn register-btn">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
