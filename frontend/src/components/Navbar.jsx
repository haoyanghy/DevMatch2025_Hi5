import { Link } from 'react-router-dom';
import { useMetaMask } from 'metamask-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar({ onUserChange }) {
  const { status, connect, account, chainId } = useMetaMask();
  const [user, setUser] = useState(null);

  // Update user state when MetaMask connection changes
  useEffect(() => {
    if (status === 'connected' && account) {
      const newUser = {
        name: `${account.slice(0, 6)}...${account.slice(-4)}`,
        address: account,
        chainId: chainId
      };
      setUser(newUser);
      onUserChange?.(newUser);
    } else {
      setUser(null);
      onUserChange?.(null);
    }
  }, [status, account, chainId, onUserChange]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect to MetaMask:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      setUser(null);
      onUserChange?.(null);
      
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
      
      localStorage.removeItem('walletconnect');
      sessionStorage.clear();
      
      alert('To fully disconnect, please:\n1. Click the MetaMask extension icon\n2. Click "Connected" or the green dot\n3. Click "Disconnect" next to this site\n\nPage will refresh after you click OK.');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Disconnect error:', error);
      setUser(null);
      onUserChange?.(null);
      window.location.reload();
    }
  };


  const renderConnectionStatus = () => {
    switch (status) {
      case 'initializing':
        return <div className="connecting">Connecting to MetaMask...</div>;
      
      case 'unavailable':
        return (
          <div className="metamask-unavailable">
            <a 
              href="https://metamask.io/download/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="install-metamask"
            >
              Install MetaMask
            </a>
          </div>
        );
      
      case 'notConnected':
        return (
          <button 
            onClick={handleConnect} 
            className="connect-wallet-btn"
          >
            Connect Wallet
          </button>
        );
      
      case 'connecting':
        return <div className="connecting">Connecting...</div>;
      
      case 'connected':
        return (
          <div className="wallet-connected">
            <span className="wallet-address">{user?.name}</span>
            <button onClick={handleDisconnect} className="disconnect-btn">
              Disconnect
            </button>
          </div>
        );
      
      default:
        return (
          <button 
            onClick={handleConnect} 
            className="connect-wallet-btn"
          >
            Connect Wallet
          </button>
        );
    }
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-logo">
          {/* logo */}
          MirrorTrade
        </Link>
      </div>

      {user && (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/support">Support</Link>
          <Link to="/about">About</Link>
        </div>
      )}

      {/* MetaMask Connection Section */}
      <div className="navbar-cta">
        <div className="nav-btn">
          {renderConnectionStatus()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
