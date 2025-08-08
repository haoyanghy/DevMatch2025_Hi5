import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TraderProfilePage() {
  const { id } = useParams();
  const [trader, setTrader] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/traders/${id}`)
      .then(res => res.json())
      .then(setTrader);
  }, [id]);

  if (!trader) return <div style={{ textAlign: "center", margin: 100 }}>Loading trader profile...</div>;

  return (
    <div style={{ maxWidth: 700, margin: "44px auto", background: "#fefefe", borderRadius: 10, padding: 38, boxShadow: "0 2px 8px #dfdfdf" }}>
      <h2>Trader: {trader.username} {trader.verified && <span style={{ color: "green" }}>✔</span>}</h2>
      <p dangerouslySetInnerHTML={{ __html: trader.bio || "No biography." }}></p>
      <div>
        <b>Strategy:</b> {trader.strategy} <br />
        <b>Performance:</b> {trader.performance}% <br />
        <b>Risk:</b> {trader.risk} <br />
        <b>Asset:</b> {trader.asset}
      </div>
      <div style={{ marginTop: 30 }}>
        <b>Performance Chart:</b>
        <img src={trader.chart || "https://placehold.co/400x120?text=Chart"} alt="Chart" style={{ width: "100%", maxWidth: 400 }} />
      </div>
      <div style={{ marginTop: 28, color: "grey" }}>
        <i>Data from public trader sources. Review independently before following signals!</i>
      </div>
    </div>
  );
}
export default TraderProfilePage;
