import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>
              Make Smarter Trades <span className="highlight">with AI-Powered Insights</span>
            </h1>
            <p>
              Join <span className="users-number">2,385+</span> active traders using intelligent recommendations matched to their <strong>unique styles</strong>. All signals are data-driven and community-sourced—trade confidently, trade your way.
            </p>
            <Link to="/register" className="cta-btn cta-hero">
              Get Started Free
            </Link>
          </div>
          <div className="hero-image">
            {/* <img src="demo-dashboard.png" alt="Demo dashboard" /> */}
          </div>
        </div>
      </header>

      <section className="why-register">
        <h2>Why Traders Join Us</h2>
        <div className="why-grid">
          <div className="why-point">
            <img src="ai-match.png" alt="" />
            <h4>AI Personalized Matches</h4>
            <p>Cut through noise: get custom recommendations for your capital, risk & time horizon.</p>
          </div>
          <div className="why-point">
            <img src="secure-payment.png" alt="" />
            <h4>Safe Blockchain Payments</h4>
            <p>Rapid, secure payments—no banks, no cards, complete privacy.</p>
          </div>
          <div className="why-point">
            <img src="instant-access.png" alt="" />
            <h4>Instant Access After Payment</h4>
            <p>Lock in your edge immediately—view top traders’ strategies as soon as you pay.</p>
          </div>
          <div className="why-point">
            <img src="privacy.png" alt="" />
            <h4>Zero Data Leaks</h4>
            <p>We never view or store your trades—100% privacy by design.</p>
          </div>
        </div>
        <Link to="/register" className="cta-btn cta-secondary">
          Join the Community
        </Link>
      </section>

      <section className="features">
        <h2>
          Power Up Your Trading Edge
        </h2>
        <div className="features-list">
          <div className="feature">
            <img src="top-traders.png" alt="" />
            <h3>Live Trader Rankings</h3>
            <p>Discover the hottest strategies, sorted by transparent live performance.</p>
          </div>
          <div className="feature">
            <img src="personalized.png" alt="" />
            <h3>Custom For You</h3>
            <p>Unique results tailored to your goals—no generic signals ever.</p>
          </div>
          <div className="feature">
            <img src="secure-data.png" alt="" />
            <h3>No Execution, Purely Data</h3>
            <p>Analyze and act on unbiased info. Your trades remain in your hands.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h4>Register & Create Wallet</h4>
            <p>Sign up to join a network of forward-thinking traders.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h4>Define Your Trading Style</h4>
            <p>Answer a few quick questions—let our engine understand your preferences.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h4>Pay Securely</h4>
            <p>Complete your membership with easy, secure blockchain payment.</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <h4>Unlock Your Picks</h4>
            <p>
              Instantly view and explore strategies—<b>all trading decisions remain yours.</b>
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Loved By Traders Worldwide</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>“Onboarding was a breeze. I trusted the payment process and found great strategies immediately!”</p>
            <span>- Lina, London</span>
          </div>
          <div className="testimonial">
            <p>“Their recommendations fit my style—feels like I have a real edge!”</p>
            <span>- Jesse, Singapore</span>
          </div>
        </div>
      </section>

      <section className="disclaimer">
        <strong>No investment advice. For informational purposes only. All trading carries risk. Your trades, your responsibility.</strong>
      </section>

    </div>
  );
}

export default LandingPage;
