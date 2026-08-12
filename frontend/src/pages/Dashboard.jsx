import { useOutletContext } from "react-router-dom";
import ExpenseChart from "../components/ExpenseChart";
import StatCards from "../components/StatCards";
import EvolutionChart from "../components/EvolutionChart";
import KpiPanel from "../components/KpiPanel";
import { formatAmount } from "../services/currency";

export default function Dashboard() {
  const { transactions, categories, budgets, monthlyIncome, selectedMonth } = useOutletContext();

  const filtered = transactions.filter((t) => t.date?.startsWith(selectedMonth));
  const recent = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  return (
    <div>
      <h2>Tableau de bord</h2>

      <StatCards transactions={filtered} monthlyIncome={monthlyIncome} />

      <KpiPanel
        transactions={transactions}
        budgets={budgets}
        selectedMonth={selectedMonth}
        categories={categories}
        monthlyIncome={monthlyIncome}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, marginTop: 20, alignItems: "start" }}>
        <ExpenseChart transactions={filtered} categories={categories} />

        <div className="card">
          <h3 style={{ fontSize: 14.5, marginBottom: 12, fontWeight: 600 }}>Dernières transactions</h3>
          {recent.length === 0 ? (
            <div style={{ fontSize: 12.5, color: "var(--slate)" }}>Aucune transaction ce mois-ci</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, maxHeight: 320, overflowY: "auto" }}>
              {recent.map((t) => (
                <li
                  key={t.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid var(--line)",
                    fontSize: 13,
                  }}
                >
                  <span>
                    <div style={{ fontWeight: 500 }}>{getCategoryName(t.category)}</div>
                    <div style={{ fontSize: 11.5, color: "var(--slate)" }}>{t.date}</div>
                  </span>
                  <span style={{ fontWeight: 600 }}>{formatAmount(t.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <EvolutionChart transactions={transactions} />
    </div>
  );
}