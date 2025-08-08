import React from "react";
import "./EducationPage.css";

function GuideCard({ title, desc, link }) {
  return (
    <a className="guide-card" href={link || "#"} target="_blank" rel="noopener noreferrer">
      <div className="guide-title">{title}</div>
      <div className="guide-desc">{desc}</div>
    </a>
  );
}
function GlossaryTerm({ word, def }) {
  return (
    <div className="glossary-term">
      <b>{word}</b>: <span>{def}</span>
    </div>
  );
}
function VideoCard({ title, src, comingSoon }) {
  return (
    <div className={`video-card${comingSoon ? " video-coming" : ""}`}>
      <img src={src} alt={title} />
      <div style={{marginTop: 7}}>{title}</div>
      {comingSoon && <span className="soon">Coming Soon</span>}
    </div>
  );
}
function FAQItem({ q, a }) {
  return (
    <details className="faq-item">
      <summary>{q}</summary>
      <div>{a}</div>
    </details>
  );
}

export default function EducationPage() {
  return (
    <div className="edu-bg">
      <div className="edu-container">
        <h1 className="edu-title">Educational Hub / Resources</h1>
        
        {/* --- Guides --- */}
        <section className="edu-section">
          <h2>📚 Beginner’s Guides</h2>
          <div className="guide-cards">
            <GuideCard
              title="What is Copy Trading?"
              desc="An introduction to the basic concept, risks, and rewards of copy trading."
              link="#"
            />
            <GuideCard
              title="Getting Started (Step-by-Step)"
              desc="How to register, set your style, answer questions, and get your first results."
              link="#"
            />
            <GuideCard
              title="How to Use Your Free Quota"
              desc="A walkthrough of the 5-free-use experience and how to unlock more."
              link="#"
            />
            <GuideCard
              title="Understanding Recommendations"
              desc="How we select and match traders for your portfolio. How to analyze your matches."
              link="#"
            />
            <GuideCard
              title="Crypto Portfolio Basics"
              desc="Wallets, seed phrases, security—and what trading style fits a crypto beginner."
              link="#"
            />
          </div>
        </section>
        
        
        {/* --- Glossary --- */}
        <section className="edu-section">
          <h2>📝 Glossary of Trading Terms</h2>
          <div className="glossary-grid">
            <GlossaryTerm word="Copy Trading" def="Following and executing trades from an expert automatically or manually." />
            <GlossaryTerm word="Trading Style" def="A personal risk and time profile (e.g. long-term, swing, day trading, HODL)." />
            <GlossaryTerm word="Risk Management" def="Strategies for limiting loss and volatility in your portfolio." />
            <GlossaryTerm word="Drawdown" def="How far your investments have fallen from their peak value." />
            <GlossaryTerm word="Diversification" def="Spreading your investments across different coins/assets to reduce risk." />
            <GlossaryTerm word="Expert/Signal" def="A trader or bot you can follow for recommendations." />
            <GlossaryTerm word="Sharpe Ratio" def="A measure of risk-adjusted return." />
            <GlossaryTerm word="Portfolio" def="Your collection of crypto assets, with weights and history." />
          </div>
        </section>
        
        {/* --- Video Tutorials --- */}
        <section className="edu-section">
          <h2>🎬 Video Tutorials</h2>
          <div className="video-grid">
            <VideoCard title="Copy Trading Explained Simply" src="https://img.youtube.com/vi/2F4b7TVPp5Q/0.jpg" comingSoon />
            <VideoCard title="How to Set Up Your Wallet" src="https://img.youtube.com/vi/L6yQG6O_Co8/0.jpg" comingSoon />
            <VideoCard title="Spotting a Trading Style: Beginner vs Expert" src="https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg" comingSoon />
            <VideoCard title="Risk Management For Crypto" src="https://img.youtube.com/vi/2PS7QU9jfI4/0.jpg" comingSoon />
          </div>
        </section>
        
        {/* --- Risk Management & Help --- */}
        <section className="edu-section">
          <h2>🛡️ Risk Management</h2>
          <div className="guide-cards">
            <GuideCard
              title="Keeping Your Funds Safe"
              desc="Tips for seed phrase protection and preventing scams."
              link="#"
            />
            <GuideCard
              title="Understanding Volatility"
              desc="Why prices move fast in crypto and how to avoid emotional trading."
              link="#"
            />
            <GuideCard
              title="Practicing With Small Amounts"
              desc="How to test strategies with limited risk using our platform."
              link="#"
            />
          </div>
        </section>
        
        {/* --- FAQ --- */}
        <section className="edu-section">
          <h2>💡 FAQ / Help</h2>
          <FAQItem
            q="Do I need to send any funds to your platform?"
            a="No, we never ask for your money or private keys. You get data and match recommendations—trading is always done by you at your own exchange or wallet."
          />
          <FAQItem
            q="How do I pick my trading style?"
            a="Beginners answer a series of questions to help you discover what level of risk and time commitment is best. Experts can set style directly. You can update any time."
          />
          <FAQItem
            q="How do I get more recommendations after my free quota?"
            a="You can pay securely—using blockchain, no card needed—to unlock 10 more personalized matches instantly."
          />
          <FAQItem
            q="Is this investment advice?"
            a="No. These are educational matches and risk data only. We give you tools; decisions are yours."
          />
          <FAQItem
            q="Where can I learn more?"
            a="Check the guides above, or contact support for questions!"
          />
        </section>
      </div>
    </div>
  );
}
