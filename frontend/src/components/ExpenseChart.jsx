import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getCategoryStyle } from "../services/categoryStyle";

ChartJS.register(ArcElement, Tooltip, Legend);


export default function ExpenseChart({ transactions, categories }) {
  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "Inconnue";

  const totals = {};
  const colorsByLabel = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const name = getCategoryName(t.category);
      totals[name] = (totals[name] || 0) + parseFloat(t.amount);
      colorsByLabel[name] = getCategoryStyle(t.category).color;
    });

  const labels = Object.keys(totals);
  const values = Object.values(totals);

  if (labels.length === 0) return <p>Aucune dépense à afficher.</p>;

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((name) => colorsByLabel[name]),
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