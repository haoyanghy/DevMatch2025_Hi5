import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-logo">
          {/* logo */}
          MirrorTrade
        </Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/education">Learn</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="navbar-cta">
        {!user ? (
          <>
            <Link to="/login" className="nav-btn nav-login">Log in</Link>
            <Link to="/register" className="nav-btn nav-register">Get Started</Link>
          </>
        ) : (
          <div className="nav-user">
            <img className="nav-avatar" src={user.avatar} alt={user.name} />
            <span className="nav-username">{user.name}</span>

            <button className="nav-btn nav-logout" onClick={onLogout}>Log out</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
