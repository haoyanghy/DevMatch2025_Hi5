import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  
  const totalSlides = 8;

  const testimonials = [
    {
      text: "The quiz perfectly matched me with a trader whose strategy fits my risk level. Great transparency!",
      author: "Sarah, London"
    },
    {
      text: "Finally found a platform that shows real performance data. The copy trading results speak for themselves.",
      author: "Mike, Singapore"
    },
    {
      text: "Made 15% profit in my first month. The AI matching really works - found a trader with exactly my risk tolerance.",
      author: "David, New York"
    },
    {
      text: "Love the transparency. I can see every trade before deciding to copy. No hidden fees, just as promised.",
      author: "Lisa, Tokyo"
    },
    {
      text: "The platform's simplicity is amazing. Took the quiz, got matched, started earning. Exactly what I needed.",
      author: "Ahmed, Dubai"
    },
    {
      text: "Been copy trading for 6 months now. Consistent returns and the trader I'm matched with fits my schedule perfectly.",
      author: "Emma, Sydney"
    },
    {
      text: "As a beginner, this platform gave me confidence. The performance data helped me understand what I was getting into.",
      author: "Carlos, Mexico City"
    },
    {
      text: "The fee structure is so fair compared to other platforms. 0.2% total and I know exactly where my money goes.",
      author: "Maria, Berlin"
    }
  ];

  // Slide functionality
  const slideTestimonials = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentSlideIndex + 1) % totalSlides;
    } else {
      newIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    }
    setCurrentSlideIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  // Touch/Swipe handlers
  const handleStart = (e) => {
    setIsDragging(true);
    startX.current = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX.current = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diffX = startX.current - currentX.current;
    const threshold = 50;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        slideTestimonials('next');
      } else {
        slideTestimonials('prev');
      }
    }
  };

  // Auto-slide functionality
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      slideTestimonials('next');
    }, 5000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [currentSlideIndex]);

  // Update slider transform
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.offsetWidth + 20 || 0;
      sliderRef.current.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }
  }, [currentSlideIndex]);

  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Match Your Trading Style with Top Performers
          </h1>
          <p className="hero-subtitle">
            Take our quiz, get matched with a proven trader, and start copy trading with confidence.
          </p>
          <Link to="/register" className="cta-button">
            Register Now
          </Link>
        </div>
      </header>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>AI-Powered Matching</h3>
          <p>Our smart quiz analyzes your trading preferences and matches you with the perfect trader for your style.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Transparent Performance Data</h3>
          <p>View complete trading history, analytics, and results before deciding to copy trade.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Copy Trading</h3>
          <p>Simple fee structure: 0.1% platform fee + 0.1% trader fee. Your funds, your control.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Complete Privacy</h3>
          <p>We never view or store your trades—100% privacy by design. All decisions remain yours.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Real-Time Results</h3>
          <p>Monitor your copy trades in real-time and receive your coins plus profits at the end of each period.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Personalized Recommendations</h3>
          <p>Get matched with traders who share your risk tolerance, time horizon, and trading experience level.</p>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How Our Copy Trading Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Take Our Quiz</h3>
              <p>Answer questions about your trading preferences, risk tolerance, and experience level.</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Matched</h3>
              <p>Our AI matches you with a top trader who shares your trading style and experience.</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Review Performance</h3>
              <p>Analyze the recommended trader's complete performance data, analytics, and trading results.</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3>Start Copy Trading</h3>
              <p>Decide to copy trade. Fees are automatically deducted (0.2% total: platform + trader).</p>
            </div>

            <div className="step">
              <div className="step-number">5</div>
              <h3>Earn Returns</h3>
              <p>After the trading period, receive your coins back plus any profits earned.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="benefits">
        <div className="container">
          <h2>Why Choose Our Platform?</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <h3>Smart Matching System</h3>
              <p>Our AI-powered quiz ensures you're matched with traders who fit your exact trading profile and goals.</p>
            </div>

            <div className="benefit">
              <h3>Transparent Fee Structure</h3>
              <p>Simple and fair: 0.1% platform fee + 0.1% trader fee. No hidden costs or surprises.</p>
            </div>

            <div className="benefit">
              <h3>Full Transparency</h3>
              <p>Access complete performance analytics and trading history before making any copy trading decisions.</p>
            </div>

            <div className="benefit">
              <h3>Your Responsibility, Your Control</h3>
              <p>All trading decisions and results remain your responsibility. We provide the tools, you make the choices.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="testimonials-wrapper">
            <div 
              className="testimonial-slider"
              ref={sliderRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                  <p>"{testimonial.text}"</p>
                  <cite>- {testimonial.author}</cite>
                </div>
              ))}
            </div>
            
            <div className="slider-nav">
              <button className="navi-btn prev-btn" onClick={() => slideTestimonials('prev')}>‹</button>
              <button className="navi-btn next-btn" onClick={() => slideTestimonials('next')}>›</button>
            </div>
            
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <span 
                  key={index}
                  className={`dot ${index === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Perfect Trading Match?</h2>
          <p>Take our quick quiz and get matched with a top trader today.</p>
          <Link to="/register" className="cta-button large">
            Get Started Now
          </Link>
          <p className="disclaimer">
            All trading involves risk. Past performance does not guarantee future results. 
            You are responsible for all trading decisions and outcomes.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
