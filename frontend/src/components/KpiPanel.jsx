export default function KpiPanel({ transactions, budgets, selectedMonth, categories }) {
  const filtered = transactions.filter((t) => t.date?.startsWith(selectedMonth));

  const income = filtered.filter((t) => t.type === "income").reduce((s, t) => s + parseFloat(t.amount), 0);
  const expenses = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + parseFloat(t.amount), 0);

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const monthBudgets = budgets.filter((b) => b.month?.startsWith(selectedMonth));
  const getSpent = (categoryId) =>
    filtered
      .filter((t) => Number(t.category) === Number(categoryId) && t.type === "expense")
      .reduce((s, t) => s + parseFloat(t.amount), 0);
  const respected = monthBudgets.filter((b) => getSpent(b.category) <= parseFloat(b.limit_amount));
  const respectRate = monthBudgets.length > 0 ? (respected.length / monthBudgets.length) * 100 : null;

  const now = new Date();
  const isCurrentMonth = selectedMonth === now.toISOString().slice(0, 7);
  const daysElapsed = isCurrentMonth ? now.getDate() : new Date(selectedMonth + "-01").getDate() === 1 ? 30 : 30;
  const daysInMonth = new Date(Number(selectedMonth.split("-")[0]), Number(selectedMonth.split("-")[1]), 0).getDate();
  const avgPerDay = daysElapsed > 0 ? expenses / (isCurrentMonth ? now.getDate() : daysInMonth) : 0;
  const projection = isCurrentMonth ? avgPerDay * daysInMonth : expenses;

  const totalsByCategory = {};
  filtered
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totalsByCategory[t.category] = (totalsByCategory[t.category] || 0) + parseFloat(t.amount);
    });
  const topCategoryId = Object.keys(totalsByCategory).sort((a, b) => totalsByCategory[b] - totalsByCategory[a])[0];
  const topCategoryName = topCategoryId
    ? categories.find((c) => Number(c.id) === Number(topCategoryId))?.name
    : null;

  const kpiStyle = { textAlign: "center" };
  const valueStyle = { fontFamily: "Fraunces, serif", fontSize: 22, marginTop: 6 };
  const labelStyle = { fontSize: 11.5, color: "var(--slate)", fontWeight: 600 };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 22 }}>
      <div className="card" style={kpiStyle}>
        <div style={labelStyle}>Taux d'épargne</div>
        <div style={{ ...valueStyle, color: savingsRate >= 0 ? "var(--success)" : "var(--alert)" }}>
          {savingsRate.toFixed(0)}%
        </div>
      </div>
      <div className="card" style={kpiStyle}>
        <div style={labelStyle}>Budgets respectés</div>
        <div style={valueStyle}>{respectRate === null ? "—" : `${respectRate.toFixed(0)}%`}</div>
      </div>
      <div className="card" style={kpiStyle}>
        <div style={labelStyle}>Dépense moy./jour</div>
        <div style={valueStyle}>{avgPerDay.toFixed(0)} F</div>
      </div>
      <div className="card" style={kpiStyle}>
        <div style={labelStyle}>Projection fin de mois</div>
        <div style={valueStyle}>{projection.toFixed(0)} F</div>
      </div>
      <div className="card" style={kpiStyle}>
        <div style={labelStyle}>Catégorie top dépense</div>
        <div style={{ ...valueStyle, fontSize: 16 }}>{topCategoryName || "—"}</div>
      </div>
    </div>
  );
}