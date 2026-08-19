import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";
import Logo from "../components/Logo";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch {
      setError("Identifiants incorrects");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, var(--rose-pale) 0%, var(--rose-soft) 50%, var(--rose) 100%)",
      }}
    >
      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); }
        }
        .login-card { animation: cardEnter 0.5s ease both; }
        .login-logo { animation: logoPop 0.6s ease both 0.15s; display: inline-block; }
        .login-field input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .login-field input:focus {
          border-color: var(--rose);
          box-shadow: 0 0 0 3px var(--rose-soft);
          outline: none;
        }
        .login-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(214, 51, 108, 0.28);
        }
        .login-error {
          animation: cardEnter 0.3s ease both;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="card login-card" style={{ width: 390, padding: "42px 38px" }}>
        <span className="login-logo"><Logo size={34} /></span>
        <h1 style={{ fontSize: 25, marginBottom: 6 }}>Bon retour</h1>
        <p style={{ color: "var(--slate)", fontSize: 13.5, marginBottom: 26 }}>
          Connectez-vous pour suivre vos dépenses
        </p>

        {error && (
          <p className="login-error" style={{ color: "var(--alert)", marginBottom: 12 }}>
            {error}
          </p>
        )}

        <div className="field login-field">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            placeholder="votre_nom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="field login-field">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn-primary login-btn"
          style={{ width: "100%", justifyContent: "center" }}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Connexion..." : "Se connecter"}
        </button>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--slate)" }}>
          Pas de compte ? <Link to="/register" style={{ color: "var(--rose)", fontWeight: 600 }}>S'inscrire</Link>
        </div>
      </form>
    </div>
  );
}