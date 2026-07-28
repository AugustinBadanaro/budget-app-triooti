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

  const labels = months.map((m) => {
    const [year, mon] = m.split("-");
    return new Date(year, mon - 1).toLocaleDateString("fr-FR", { month: "short" });
  });

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
    ],
  };

  return (
    <div className="card" style={{ marginTop: 22 }}>
      <h3 style={{ fontSize: 14.5, fontWeight: 600, fontFamily: "Inter, sans-serif", marginBottom: 18 }}>
        Évolution sur 6 mois
      </h3>
      <Line
        data={data}
        options={{
          plugins: { legend: { display: false } },
          scales: {
            y: { ticks: { font: { family: "IBM Plex Mono", size: 10.5 } }, grid: { color: "#F0E3EA" } },
            x: { ticks: { font: { family: "Inter", size: 11 } }, grid: { display: false } },
          },
        }}
      />
    </div>
  );
}