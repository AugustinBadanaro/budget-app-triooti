/*
Taux d'épargne = (revenus − dépenses) / revenus × 100 — indicateur numéro 1 dans toute app de finance perso.
Taux de respect du budget = % de catégories où les dépenses restent sous la limite ce mois-ci.
Répartition réelle vs cible 50/30/20 = comparer ce qui est réellement dépensé par groupe (essential/variable/savings) à la répartition théorique — visuellement fort (barres côte à côte).
Dépense moyenne journalière = dépenses du mois / nombre de jours écoulés — permet de projeter "à ce rythme, tu finiras le mois à X FCFA".
Catégorie la plus dépensière = mise en avant de la catégorie qui pèse le plus dans le budget.

MBA = Moyennes mobiles / prévisions:
Lisser les dépenses sur plusieurs mois pour dégager une tendance plutôt que des 
variations mois par mois. Concrètement : une moyenne mobile sur 3 mois glissants 
des dépenses totales, affichée en superposition sur ton graphique d'évolution existant. 
Utile pour dire "en moyenne, tu dépenses X par mois" plutôt que des chiffres qui sautent.

*/

export default function KpiPanel({ transactions, budgets, selectedMonth, categories, monthlyIncome }) {
  const filtered = transactions.filter((t) => t.date?.startsWith(selectedMonth));

  const expenses = filtered.reduce((s, t) => s + parseFloat(t.amount), 0);
  const income = monthlyIncome || 0;

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const monthBudgets = budgets.filter((b) => b.month?.startsWith(selectedMonth));
  const getSpent = (categoryId) =>
    filtered
      .filter((t) => Number(t.category) === Number(categoryId))
      .reduce((s, t) => s + parseFloat(t.amount), 0);
  const respected = monthBudgets.filter((b) => getSpent(b.category) <= parseFloat(b.limit_amount));
  const respectRate = monthBudgets.length > 0 ? (respected.length / monthBudgets.length) * 100 : null;

  const now = new Date();
  const isCurrentMonth = selectedMonth === now.toISOString().slice(0, 7);
  const daysInMonth = new Date(Number(selectedMonth.split("-")[0]), Number(selectedMonth.split("-")[1]), 0).getDate();
  const avgPerDay = expenses / (isCurrentMonth ? now.getDate() : daysInMonth);
  const projection = isCurrentMonth ? avgPerDay * daysInMonth : expenses;

  const totalsByCategory = {};
  filtered.forEach((t) => {
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
          {income > 0 ? `${savingsRate.toFixed(0)}%` : "—"}
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