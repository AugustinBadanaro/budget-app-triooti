import { Link } from "react-router-dom";
import Logo from "../components/Logo";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 450,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Logo size={54} />
        </div>

        {/* Titre */}
        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 36,
            fontWeight: 700,
            margin: "0 0 12px 0",
          }}
        >
          Budgetly
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 420,
            margin: "0 0 28px 0",
            opacity: 0.9,
          }}
        >
          Prenez le contrôle de vos finances. Suivez vos revenus,
          gérez vos dépenses et atteignez vos objectifs grâce à une
          gestion de budget simple, intelligente et efficace.
        </p>

        {/* Bouton */}
        <Link
          to="/login"
          className="btn-primary"
          style={{
            textDecoration: "none",
            display: "inline-flex",
          }}
        >
          Commencer
        </Link>
      </div>
    </div>
  );
}