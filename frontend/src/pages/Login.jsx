import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--rose-pale)",
      }}
    >
      <form onSubmit={handleSubmit} className="card" style={{ width: 390, padding: "42px 38px" }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "linear-gradient(135deg, var(--rose), #A8195A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontFamily: "Fraunces, serif",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 18,
          }}
        >
          B
        </div>
        <h1 style={{ fontSize: 25, marginBottom: 6 }}>Bon retour</h1>
        <p style={{ color: "var(--slate)", fontSize: 13.5, marginBottom: 26 }}>
          Connectez-vous pour suivre vos dépenses
        </p>

        {error && <p style={{ color: "var(--alert)", marginBottom: 12 }}>{error}</p>}

        <div className="field">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            placeholder="votre_nom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} type="submit">
          Se connecter
        </button>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--slate)" }}>
          Pas de compte ? <Link to="/register" style={{ color: "var(--rose)", fontWeight: 600 }}>S'inscrire</Link>
        </div>
      </form>
    </div>
  );
}