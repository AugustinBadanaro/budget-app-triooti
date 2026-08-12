import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { formatAmount } from "../services/currency";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

export default function EvolutionChart({ transactions }) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d.toISOString().slice(0, 7));
  }

  const totals = months.map((m) =>
    transactions
      .filter((t) => t.type === "expense" && t.date?.startsWith(m))
      .reduce((sum, t) => sum + parseFloat(t.amount), 0)
  );

  const movingAvg = totals.map((_, i) => {
    const start = Math.max(0, i - 2);
    const slice = totals.slice(start, i + 1);
    return slice.reduce((s, v) => s + v, 0) / slice.length;
  });

  const labels = months.map((m) => {
    const [year, mon] = m.split("-");
    return new Date(year, mon - 1).toLocaleDateString("fr-FR", { month: "short" });
  });

  // Phrase de synthèse : compare le dernier mois complet au précédent
  const current = totals[totals.length - 1];
  const previous = totals[totals.length - 2];
  let summary = "Pas encore assez de données pour comparer.";
  if (previous > 0) {
    const diff = ((current - previous) / previous) * 100;
    const trend = diff > 0 ? "de plus" : "de moins";
    summary = `Vous avez dépensé ${formatAmount(current)} ce mois-ci, soit ${Math.abs(diff).toFixed(0)}% ${trend} que le mois dernier.`;
  } else if (current > 0) {
    summary = `Vous avez dépensé ${formatAmount(current)} ce mois-ci.`;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Dépenses",
        data: totals,
        borderColor: "#D6336C",
        backgroundColor: "rgba(214,51,108,0.08)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointBackgroundColor: "#D6336C",
      },
      {
        label: "Moyenne mobile (3 mois)",
        data: movingAvg,
        borderColor: "#3A6EA5",
        backgroundColor: "transparent",
        borderDash: [6, 4],
        fill: false,
        tension: 0.35,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="card" style={{ marginTop: 22 }}>
      <h3 style={{ fontSize: 14.5, fontWeight: 600, fontFamily: "Inter, sans-serif", marginBottom: 8 }}>
        Évolution sur 6 mois
      </h3>
      <p style={{ fontSize: 12.8, color: "var(--slate)", marginBottom: 16 }}>{summary}</p>
      <Line
        data={data}
        options={{
          plugins: {
            legend: { display: true, position: "bottom", labels: { font: { family: "Inter", size: 11 }, boxWidth: 10 } },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.dataset.label} : ${formatAmount(ctx.raw)}`,
              },
            },
          },
          scales: {
            y: { ticks: { font: { family: "IBM Plex Mono", size: 10.5 } }, grid: { color: "#F0E3EA" } },
            x: { ticks: { font: { family: "Inter", size: 11 } }, grid: { display: false } },
          },
        }}
      />
    </div>
  );
}