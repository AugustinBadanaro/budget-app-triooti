import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7"];

export default function ExpenseChart({ transactions, categories }) {
  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "Inconnue";

  const totals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const name = getCategoryName(t.category);
      totals[name] = (totals[name] || 0) + parseFloat(t.amount);
    });

  const labels = Object.keys(totals);
  const values = Object.values(totals);

  if (labels.length === 0) return <p>Aucune dépense à afficher.</p>;

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, i) => COLORS[i % COLORS.length]),
      },
    ],
  };

  return (
    <div style={{ maxWidth: "350px" }}>
      <h3>Dépenses par catégorie</h3>
      <Doughnut data={data} />
    </div>
  );
}