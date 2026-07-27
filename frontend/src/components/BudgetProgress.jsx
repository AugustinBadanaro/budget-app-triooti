import { deleteBudget } from "../services/transactions";

export default function BudgetProgress({ budgets, categories, transactions, onDelete }) {
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

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce budget ?")) return;
    try {
      await deleteBudget(id);
      onDelete(id);
    } catch (err) {
      alert("Erreur lors de la suppression du budget");
    }
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
              <button onClick={() => handleDelete(b.id)} style={{ marginLeft: "10px" }}>
                Supprimer
              </button>
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