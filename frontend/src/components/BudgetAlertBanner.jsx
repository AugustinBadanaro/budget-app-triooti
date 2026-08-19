import { getAlertThreshold } from "../services/settings";

export default function BudgetAlertBanner({ budgets, categories, transactions, selectedMonth }) {
  const threshold = getAlertThreshold();
  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  const getSpent = (categoryId, month) => {
    const monthPrefix = month.slice(0, 7);
    return transactions
      .filter(
        (t) =>
          Number(t.category) === Number(categoryId) &&
          t.date &&
          t.date.startsWith(monthPrefix)
      )
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const alerts = budgets
    .map((b) => {
      const limit = parseFloat(b.limit_amount);
      const spent = getSpent(b.category, b.month);
      const percentage = limit > 0 ? (spent / limit) * 100 : 0;
      return { name: getCategoryName(b.category), percentage, over: spent > limit };
    })
    .filter((b) => b.percentage >= threshold);

  if (alerts.length === 0) return null;

    return (
    <div
      style={{
        background: "var(--alert-soft)",
        border: "2px solid var(--alert)",
        color: "var(--alert)",
        padding: "16px 20px",
        borderRadius: 12,
        fontSize: 13.8,
        fontWeight: 700,
        marginBottom: 22,
        boxShadow: "0 4px 14px -4px rgba(194,65,12,.35)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      {alerts.map((b, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          {b.over
            ? `Budget "${b.name}" dépassé (${b.percentage.toFixed(0)}%)`
            : `Budget "${b.name}" a atteint ${b.percentage.toFixed(0)}% (seuil : ${threshold}%)`}
        </div>
      ))}
    </div>
  );

}