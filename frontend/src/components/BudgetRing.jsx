export default function BudgetRing({ percentage, over }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const clampedPct = Math.min(percentage, 100);
  const offset = circumference - (clampedPct / 100) * circumference;
  const color = over ? "var(--alert)" : percentage > 80 ? "#D6336C" : "var(--success)";

  return (
    <div style={{ position: "relative", width: 88, height: 88, margin: "0 auto 14px" }}>
      <svg width="88" height="88" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="44" cy="44" r={radius} stroke="var(--line)" strokeWidth="9" fill="none" />
        <circle
          cx="44"
          cy="44"
          r={radius}
          stroke={color}
          strokeWidth="9"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "IBM Plex Mono, monospace",
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {percentage.toFixed(0)}%
      </div>
    </div>
  );
}