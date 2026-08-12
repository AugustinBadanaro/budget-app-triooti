import { NavLink, useNavigate, Link } from "react-router-dom";
import { logout } from "../services/auth";
import Logo from "./Logo";

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "var(--white)",
  borderBottom: "1px solid var(--line)",
  padding: "14px 20px",
  flexWrap: "wrap",
  gap: 12,
};

const linkStyle = ({ isActive }) => ({
  padding: "9px 16px",
  borderRadius: "10px",
  fontSize: "13.8px",
  fontWeight: 600,
  textDecoration: "none",
  color: isActive ? "#fff" : "var(--slate)",
  background: isActive ? "var(--rose)" : "transparent",
});

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Logo />
          <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 17, color: "var(--ink)" }}>
            Budgetly
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "var(--rose-soft)",
              color: "var(--rose)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            👤
          </div>
          <button className="btn-ghost" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      <div className="navbar-links" style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        <NavLink to="/dashboard" style={linkStyle}>Tableau de bord</NavLink>
        <NavLink to="/transactions" style={linkStyle}>Transactions</NavLink>
        <NavLink to="/budgets" style={linkStyle}>Budgets</NavLink>
        <NavLink to="/settings" style={linkStyle}>Paramètres</NavLink>
        <NavLink to="/education" style={linkStyle}>Education</NavLink>
      </div>
    </nav>
  );
}