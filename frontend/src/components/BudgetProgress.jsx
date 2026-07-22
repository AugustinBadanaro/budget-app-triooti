export default function BudgetProgress({ budgets, categories, transactions }) {
  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "Inconnue";

  const getSpent = (categoryId, month) => {
    return transactions
      .filter((t) => t.category === categoryId && t.type === "expense" && t.date?.startsWith(month.slice(0, 7)))
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  return (
    <div>
      <h3>Budgets du mois</h3>
      {budgets.map((b) => {
        const limit = parseFloat(b.limit_amount);
        const spent = getSpent(b.category, b.month);
        const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
        const over = spent > limit;

        return (
          <div key={b.id} style={{ marginBottom: "10px" }}>
            <p>
              {getCategoryName(b.category)} — {spent.toFixed(0)} / {limit.toFixed(0)} FCFA
              {over && <span style={{ color: "red" }}> (dépassé)</span>}
            </p>
            <div style={{ background: "#eee", height: "10px", width: "100%" }}>
              <div
                style={{
                  background: over ? "red" : "green",
                  height: "10px",
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}