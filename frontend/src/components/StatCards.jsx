import { formatAmount } from "../services/currency";

export default function StatCards({ transactions, monthlyIncome }) {
  const expenses = transactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );

  const balance = monthlyIncome - expenses;

  const cardStyle = {
    padding: 22,
    position: "relative",
    textAlign: "center",
  };

  const iconStyle = (bg, color) => ({
    minWidth: 90,
    height: 38,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    background: bg,
    color: color,
    fontWeight: 700,
    fontSize: 13,
    padding: "0 12px",
  });

  return (
    <div
      className="grid-responsive"
      style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        gap: 18,
        marginBottom: 22,
      }}
    >
      {/* Revenus */}
      <div className="card" style={cardStyle}>
        <div style={iconStyle("var(--success-soft)", "var(--success)")}>
          Revenus
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--slate)",
            fontWeight: 600,
          }}
        >
          Revenu mensuel
        </div>

        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 23,
            marginTop: 6,
          }}
        >
          {formatAmount(monthlyIncome)}
        </div>
      </div>

      {/* Dépenses */}
      <div className="card" style={cardStyle}>
        <div style={iconStyle("var(--alert-soft)", "var(--alert)")}>
          Dépenses
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--slate)",
            fontWeight: 600,
          }}
        >
          Dépenses du mois
        </div>

        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 23,
            marginTop: 6,
            color: "var(--alert)",
          }}
        >
          {formatAmount(expenses)}
        </div>
      </div>

      {/* Solde */}
      <div className="card" style={cardStyle}>
        <div style={iconStyle("var(--rose-soft)", "var(--rose)")}>
          Solde
        </div>

        <div
          style={{
            fontSize: 12,
            color: "var(--slate)",
            fontWeight: 600,
          }}
        >
          Solde disponible
        </div>

        <div
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 28,
            marginTop: 6,
          }}
        >
          {formatAmount(balance)}
        </div>
      </div>
    </div>
  );
}