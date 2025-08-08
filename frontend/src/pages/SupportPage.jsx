import React, { useState } from "react";
import "./SupportPage.css";

export default function SupportPage() {
  const [form, setForm] = useState({ type: "issue", desc: "", email: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="support-bg">
      <div className="support-container">
        <h2>Support & Feedback</h2>
        <form className="support-form" onSubmit={handleSubmit}>
          <label>
            What do you need help with?
          </label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="issue">Report an Issue</option>
            <option value="feature">Feature Request</option>
            <option value="contact">Contact Support</option>
          </select>
          
          <label>
            Please describe:
          </label>
          <textarea
            name="desc"
            rows={6}   
            style={{ minHeight: 96, resize: "vertical" }} 
            value={form.desc}
            onChange={handleChange}
            placeholder="Describe your issue, request, or question..."
            required
            disabled={sent}
          />
          
          <label>
            Your email (for reply)
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="optional"
            disabled={sent}
          />
          
          <button type="submit" disabled={sent}>
            {sent ? "Thank you!" : "Submit"}
          </button>
        </form>
        <div className="support-contact">
          <h3>Contact Us Directly</h3>
          <div>Email: <a href="mailto:support@yourplatform.com">support@yourplatform.com</a></div>
          <div>Live Chat: <span>Coming soon</span></div>
        </div>
      </div>
    </div>
  );
}
