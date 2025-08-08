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

      {user && (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/support">Support</Link>
          <Link to="/about">About</Link>
        </div>
      )}

      <div className="navbar-cta">
        {!user ? (
          <>
            <Link to="/login" className="nav-btn nav-login">Log in</Link>
            <Link to="/register" className="nav-btn nav-register">Get Started</Link>
          </>
        ) : (
          <div className="user-profile">
            <Link to="/profile" className="profile-link">
              <div className="profile-pic">
                <img 
                  src={user.profilePicture || user.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&rounded=true&size=40`}
                  alt={`${user.name}'s profile`}
                  className="profile-image"
                />
              </div>
            </Link>
            <Link to="/profile" className="username-link">
              <span className="username">{user.name}</span>
            </Link>
            <button onClick={onLogout} className="nav-btn nav-logout">Log out</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
