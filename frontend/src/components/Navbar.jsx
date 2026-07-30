import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

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
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            }}
          >
            B
          </div>
          <span style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 17 }}>
            Budgetly
          </span>
        </div>

        <button
          className="btn-ghost"
          style={{ display: "none" }}
          id="navbar-toggle"
          onClick={() => setOpen(!open)}
        >
          Menu
        </button>
      </div>

      <div
        className="navbar-links"
        style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
      >
        <NavLink to="/dashboard" style={linkStyle}>Tableau de bord</NavLink>
        <NavLink to="/transactions" style={linkStyle}>Transactions</NavLink>
        <NavLink to="/budgets" style={linkStyle}>Budgets</NavLink>
        <NavLink to="/settings" style={linkStyle}>Paramètres</NavLink>
      </div>

      <button className="btn-ghost" onClick={handleLogout}>
        Déconnexion
      </button>
    </nav>
  );
}