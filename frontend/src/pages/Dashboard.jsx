import { useOutletContext } from "react-router-dom";
import ExpenseChart from "../components/ExpenseChart";
import StatCards from "../components/StatCards";
import EvolutionChart from "../components/EvolutionChart";

export default function Dashboard() {
  const { transactions, categories, selectedMonth } = useOutletContext();

  const filtered = transactions.filter((t) => t.date?.startsWith(selectedMonth));
  const recent = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  return (
    <div>
      <h2>Tableau de bord</h2>

      <StatCards transactions={filtered} />

      <ExpenseChart transactions={filtered} categories={categories} />

      <EvolutionChart transactions={transactions} />

      <h3 style={{ marginTop: 24 }}>Dernières transactions</h3>
      <ul>
        {recent.map((t) => (
          <li key={t.id}>
            {t.date} — {getCategoryName(t.category)} — {t.type === "income" ? "+" : "-"}{t.amount} FCFA
          </li>
        ))}
      </ul>
    </div>
  );
}