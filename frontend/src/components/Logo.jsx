export default function Logo({ size = 34 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.29,
        background: "linear-gradient(135deg, var(--rose), #A8195A)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path
          d="M4 18V6a2 2 0 0 1 2-2h6a4 4 0 0 1 0 8H8m0 0h8a4 4 0 0 1 0 8H6a2 2 0 0 1-2-2v-2"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}