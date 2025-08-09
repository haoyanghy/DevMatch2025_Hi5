import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const beginnerQuestions = [
  {
    q: "Do you prefer watching the market every day?",
    a: [
      "Yes, I like to monitor daily",
      "I check a few times per week",
      "I prefer to review monthly or less",
    ]
  },
  {
    q: "What is more important to you?",
    a: [
      "Fast gains (even if volatile)",
      "A balance of safety and growth",
      "Preserving capital, slow steady gains"
    ]
  },
  {
    q: "How long do you intend to hold your typical investment?",
    a: [
      "Hours to days",
      "Weeks to months",
      "Years"
    ]
  },
  {
    q: "Which feels worse for you?",
    a: [
      "Missing out on big gains",
      "Losing some of my money",
      "Seeing no growth for a long time"
    ]
  },
  {
    q: "How do you feel about complex instruments (options, futures)?",
    a: [
      "Comfortable and interested",
      "Somewhat familiar",
      "I avoid them"
    ]
  },
  {
    q: "Your market knowledge:",
    a: [
      "Just starting out",
      "Intermediate",
      "Advanced"
    ]
  },
  {
    q: "Which statement fits?",
    a: [
      "I usually research and follow trends",
      "I rely on fundamentals and news",
      "I prefer copying experts entirely"
    ]
  },
  {
    q: "If your portfolio drops 20% in a week, you:",
    a: [
      "Buy more or hold on",
      "Get concerned but wait",
      "Consider selling to avoid more losses"
    ]
  },
  {
    q: "What is your main outcome with trading?",
    a: [
      "Maximize returns, even if risky",
      "Beat inflation and grow savings",
      "Learn and gain experience"
    ]
  },
  {
    q: "How much time will you spend per week on trading?",
    a: [
      "10+ hours",
      "2-10 hours",
      "Less than 2 hours"
    ]
  }
];

export default function DashboardPage() {
  const [usesLeft, setUsesLeft] = useState(5);
  const [hasPaid, setHasPaid] = useState(false);
  const [step, setStep] = useState(usesLeft > 0 || hasPaid ? "prestyle" : "paywall");
  const [beginnerAnswers, setBeginnerAnswers] = useState(Array(beginnerQuestions.length).fill(null));
  const [beginnerIndex, setBeginnerIndex] = useState(0);
  const [tradingStyle, setTradingStyle] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  function handlePay() {
    setHasPaid(true);
    setUsesLeft(10);
    setStep("prestyle");
  }

  function finishBeginner() {
    const summaryStyle = beginnerAnswers.map((a, i) => {
      const letter = ["A", "B", "C"][a];
      return `${i+1}${letter}`;
    }).join("-");
    setTradingStyle(`Auto-matched Style: ${summaryStyle}`);
    setStep("done");
  }

  function editStyle() {
    setStep("prestyle");
    setTradingStyle(null);
    setBeginnerAnswers(Array(beginnerQuestions.length).fill(null));
    setBeginnerIndex(0);
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">

        {/* HOW IT WORKS */}
        <div className="how-works-banner">
          <h2>How Our System Works</h2>
          <ol className="how-works-steps">
            <li>Take our quiz to understand your trading preferences and experience level.</li>
            <li>Our AI matches you with a top trader who shares your trading style and experience.</li>
            <li>Review the recommended trader's performance data, analytics, and trading results.</li>
            <li>Decide whether to copy trade with the recommended trader.</li>
            <li>If you choose to copy trade, fees are automatically deducted (0.1% platform fee + 0.1% trader fee).</li>
            <li>Your remaining funds are used as the trading amount for copy trading.</li>
            <li>After the trading period ends, you receive your coins back plus any profits earned.</li>
            <li>All trading decisions and results are your responsibility.</li>
          </ol>
        </div>

        {/* TRADING STYLE SELECTION FLOW */}
        {(step === "prestyle" || step === "paywall") && (usesLeft > 0 || hasPaid) && (
          <div className="style-section">
            <h3>Define Your Trading Style</h3>
            <div>
              <button className="style-btn" onClick={() => setStep("beginner")}>
                Take Guided Quiz
              </button>
            </div>
          </div>
        )}

        {step === "beginner" && (
          <BeginnerQuiz
            index={beginnerIndex}
            answers={beginnerAnswers}
            setAnswer={(ans) => {
              const next = [...beginnerAnswers];
              next[beginnerIndex] = ans;
              setBeginnerAnswers(next);
            }}
            next={() => setBeginnerIndex(i => i+1)}
            prev={() => setBeginnerIndex(i => i-1)}
            onFinish={finishBeginner}
          />
        )}

        {step === "done" && tradingStyle && (
          <div className="results-access-box">
            <div>
              <h4>Your Selected Trading Style</h4>
              <div className="portfolio-style">{tradingStyle}</div>
              <button className="edit-style-btn" onClick={editStyle}>Edit Style</button>
            </div>
            <button className="view-results-btn" onClick={() => navigate("/results")}>
              View Top 10 Trader Matches
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function BeginnerQuiz({ index, answers, setAnswer, prev, next, onFinish }) {
  const qObj = beginnerQuestions[index];
  const total = beginnerQuestions.length;
  return (
    <div className="qa-box">
      <div><b>Step {index+1} of {total}</b></div>
      <div className="beginner-question">{qObj.q}</div>
      <div style={{margin: "13px 0"}}>
        {qObj.a.map((choice, i) => (
          <label key={i} style={{ display: "block",margin:"7px 0"}}>
            <input
              type="radio"
              name={`q${index}`}
              value={i}
              checked={answers[index] === i}
              onChange={() => setAnswer(i)}
            />
            {choice}
          </label>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <button className="qa-done-btn" disabled={index === 0} onClick={prev}>Back</button>
        {index < total-1
          ? <button className="qa-done-btn" disabled={answers[index] == null} onClick={next}>Next</button>
          : <button className="qa-done-btn" disabled={answers[index] == null} onClick={onFinish}>Finish</button>
        }
      </div>
    </div>
  );
}
