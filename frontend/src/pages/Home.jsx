import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage:
          "linear-gradient(rgba(36,28,36,0.55), rgba(36,28,36,0.55)), url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: 24,
      }}
    >
      <div>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background: "linear-gradient(135deg, var(--rose), #A8195A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontFamily: "Fraunces, serif",
            fontWeight: 700,
            fontSize: 24,
          }}
        >
          B
        </div>

        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 36,
            marginBottom: 12,
          }}
        >
          Budgetly
        </h1>

        <p
          style={{
            fontSize: 15,
            maxWidth: 420,
            margin: "0 auto 28px",
            opacity: 0.9,
          }}
        >
          Prenez le contrôle de vos finances. Suivez vos revenus, gérez vos
          dépenses et atteignez vos objectifs grâce à une gestion de budget
          simple, intelligente et efficace.
        </p>

        <Link
          to="/login"
          className="btn-primary"
          style={{ textDecoration: "none", display: "inline-flex" }}
        >
          Commencer
        </Link>
      </div>
    </div>
  );
}