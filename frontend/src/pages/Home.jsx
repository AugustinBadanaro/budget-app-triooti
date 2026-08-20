import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../components/Logo";

export default function Home() {
  const fullText = "Prenez le contrôle de vos finances. Suivez vos revenus, gérez vos dépenses et atteignez vos objectifs grâce à une gestion de budget simple, intelligente et efficace.";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundImage:
          "linear-gradient(rgba(36,28,36,0.6), rgba(36,28,36,0.6)), url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: 24,
      }}
    >
      <style>{`
        @keyframes homeEnter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .home-logo { animation: homeEnter 0.5s ease both; }
        .home-title { animation: homeEnter 0.5s ease both 0.12s; }
        .home-desc { animation: homeEnter 0.5s ease both 0.24s; }
        .home-btn { animation: homeEnter 0.5s ease both 0.36s; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .home-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(214,51,108,0.35); }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 460,
        }}
      >
        <div className="home-logo" style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <Logo size={56} />
        </div>

        <h1
          className="home-title"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.5px",
            margin: "0 0 14px 0",
          }}
        >
          Budgetly
        </h1>

        <p
          className="home-desc"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 420,
            margin: "0 0 32px 0",
            opacity: 0.92,
          }}
        >
          {typed}
          <span style={{ borderRight: "2px solid #fff", marginLeft: 2, opacity: typed.length < fullText.length ? 1 : 0 }} />
        </p>

        <Link
          to="/login"
          className="btn-primary home-btn"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            padding: "13px 32px",
            fontSize: 15,
          }}
        >
          Commencer
        </Link>
      </div>
    </div>
  );
}