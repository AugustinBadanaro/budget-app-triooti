import { deleteBudget } from "../services/transactions";
import BudgetRing from "./BudgetRing";
import { formatAmount } from "../services/currency";

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

  if (budgets.length === 0) {
    return <p style={{ color: "var(--slate)" }}>Aucun budget défini pour ce mois.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
      {budgets.map((b) => {
        const limit = parseFloat(b.limit_amount);
        const spent = getSpent(b.category, b.month);
        const percentage = limit > 0 ? (spent / limit) * 100 : 0;
        const over = spent > limit;

        return (
          <div key={b.id} className="card" style={{ textAlign: "center" }}>
            <BudgetRing percentage={percentage} over={over} />
            <div style={{ fontSize: 13.8, fontWeight: 600, marginBottom: 2 }}>
              {getCategoryName(b.category)}
            </div>
            <div
              style={{
                fontSize: 11.8,
                color: "var(--slate)",
                fontFamily: "IBM Plex Mono, monospace",
                marginBottom: 10,
              }}
            >
              {formatAmount(spent)} / {formatAmount(limit)}
            </div>
            <button className="btn-ghost" onClick={() => handleDelete(b.id)}>
              Supprimer
            </button>
          </div>
        );
      })}
    </div>
  );
}