import { useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 520, margin: "48px auto", background: "#f5f7fa", padding: 32, borderRadius: 8 }}>
      <h2>Payment Via Blockchain</h2>
      <p>Send <b>0.01 ETH</b> to confirm your account and access top trader recommendations.</p>
      <div style={{ margin: "18px 0", textAlign: "center" }}>
        <div style={{ background: "#e9e9e9", borderRadius: 8, display: "inline-block", padding: "24px 28px", marginBottom: 12 }}>
          <div><b>Wallet Address:</b></div>
          <div style={{ fontFamily: "monospace", fontSize: "0.97em" }}>0xDEADBEEF...1234</div>
        </div>
        <br />
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=0xDEADBEEF1234" alt="QR" />
      </div>
      <p><b>Confirmation will be detected automatically.</b></p>
      <button onClick={() => navigate("/results")} style={{ background: "#232f3e", color: "#fff", border: "none", padding: "10px 28px", borderRadius: 5, marginTop: 10 }}>I've Paid, Show My Results</button>
    </div>
  );
}
export default PaymentPage;
