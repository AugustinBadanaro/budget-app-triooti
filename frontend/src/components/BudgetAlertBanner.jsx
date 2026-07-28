export default function BudgetAlertBanner({ budgets, categories, transactions, selectedMonth }) {
  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  const getSpent = (categoryId, month) => {
    const monthPrefix = month.slice(0, 7);
    return transactions
      .filter(
        (t) =>
          Number(t.category) === Number(categoryId) &&
          t.type === "expense" &&
          t.date &&
          t.date.startsWith(monthPrefix)
      )
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const overBudgets = budgets
    .map((b) => {
      const limit = parseFloat(b.limit_amount);
      const spent = getSpent(b.category, b.month);
      const percentage = limit > 0 ? ((spent - limit) / limit) * 100 : 0;
      return { name: getCategoryName(b.category), percentage, over: spent > limit };
    })
    .filter((b) => b.over);

  if (overBudgets.length === 0) return null;

  return (
    <div
      style={{
        background: "var(--alert-soft)",
        border: "1px solid #F3C7B0",
        color: "var(--alert)",
        padding: "14px 18px",
        borderRadius: 12,
        fontSize: 13.3,
        fontWeight: 600,
        marginBottom: 22,
      }}
    >
      {overBudgets.map((b, i) => (
        <div key={i}>
          Budget "{b.name}" dépassé de {b.percentage.toFixed(0)}% ce mois-ci
        </div>
      ))}
    </div>
  );
}