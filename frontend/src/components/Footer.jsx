import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-logo">
          {/*<img src="/logo.png" alt="Logo" />*/}
          <span>MirrorTrade</span>
        </div>
        <ul className="footer-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
        </ul>
        <div className="footer-social">
          <a href="#" aria-label="X"><img src="/x.png" alt="Twitter/X" /></a>
          <a href="#"><img src="/telegram2.png" alt="Telegram" /></a>
        </div>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} MirrorTrade. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
