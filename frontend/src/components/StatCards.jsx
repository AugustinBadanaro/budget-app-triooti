export default function StatCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = income - expenses;

  const cardStyle = { padding: 22, position: "relative" };
  const iconStyle = (bg, color) => ({
    width: 38,
    height: 38,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    background: bg,
    color: color,
    fontWeight: 700,
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 18, marginBottom: 22 }}>
      <div className="card" style={cardStyle}>
        <div style={iconStyle("var(--rose-soft)", "var(--rose)")}>S</div>
        <div style={{ fontSize: 12, color: "var(--slate)", fontWeight: 600 }}>Solde disponible</div>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 28, marginTop: 6 }}>
          {balance.toLocaleString("fr-FR")} <span style={{ fontSize: 15, color: "var(--slate)" }}>FCFA</span>
        </div>
      </div>

      <div className="card" style={cardStyle}>
        <div style={iconStyle("var(--success-soft)", "var(--success)")}>R</div>
        <div style={{ fontSize: 12, color: "var(--slate)", fontWeight: 600 }}>Revenus du mois</div>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 23, marginTop: 6 }}>
          {income.toLocaleString("fr-FR")} F
        </div>
      </div>

      <div className="card" style={cardStyle}>
        <div style={iconStyle("var(--alert-soft)", "var(--alert)")}>D</div>
        <div style={{ fontSize: 12, color: "var(--slate)", fontWeight: 600 }}>Dépenses du mois</div>
        <div style={{ fontFamily: "Fraunces, serif", fontSize: 23, marginTop: 6, color: "var(--alert)" }}>
          {expenses.toLocaleString("fr-FR")} F
        </div>
      </div>
    </div>
  );
}