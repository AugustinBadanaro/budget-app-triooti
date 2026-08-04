import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import CategoryManager from "../components/CategoryManager";
import { exportToExcel, exportToPDF } from "../services/export";
import { getCurrency, setCurrency as saveCurrency, getNotifications, setNotifications as saveNotifications } from "../services/settings";

export default function Settings() {
  const { categories, setCategories, transactions, budgets, setBudgets, selectedMonth } = useOutletContext();

  const [currency, setCurrencyState] = useState(getCurrency());
  const [notif, setNotif] = useState(getNotifications());

  const handleCurrencyChange = (value) => {
    setCurrencyState(value);
    saveCurrency(value);
  };

  const toggleNotif = (key) => {
    const updated = { ...notif, [key]: !notif[key] };
    setNotif(updated);
    saveNotifications(updated);
  };

  const switchStyle = (on) => ({
    position: "relative",
    width: 38,
    height: 21,
    background: on ? "var(--rose)" : "var(--line)",
    borderRadius: 20,
    cursor: "pointer",
    flexShrink: 0,
  });

  const knobStyle = (on) => ({
    position: "absolute",
    top: 2,
    left: on ? 19 : 2,
    width: 17,
    height: 17,
    background: "#fff",
    borderRadius: "50%",
    transition: ".15s",
  }); 

  const switchRow = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--line)" };

  const handleBudgetsRebalanced = (updatedBudgets) => {
    const updatedCategoryIds = updatedBudgets.map((b) => Number(b.category));
    const kept = budgets.filter(
      (b) => !(updatedCategoryIds.includes(Number(b.category)) && b.month?.startsWith(selectedMonth))
    );
    setBudgets([...kept, ...updatedBudgets]);
  };

  return (
    <div>
      <h2>Paramètres</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        <div className="card">
          <h3 style={{ fontSize: 14.5, marginBottom: 4, fontWeight: 600 }}>Catégories personnalisées</h3>
          <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 16 }}>
            Ajoutez ou retirez des catégories de dépenses
          </div>
          <CategoryManager
            categories={categories}
            onCategoriesChange={setCategories}
            selectedMonth={selectedMonth}
            onBudgetsRebalanced={handleBudgetsRebalanced}
          />
        </div>

        <div className="card">
          <h3 style={{ fontSize: 14.5, marginBottom: 4, fontWeight: 600 }}>Devise</h3>
          <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 16 }}>
            Utilisée pour tous les montants affichés
          </div>
          <select value={currency} onChange={(e) => handleCurrencyChange(e.target.value)}>
            <option value="XOF">FCFA (XOF)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="USD">Dollar (USD)</option>
            <option value="GHS">Cedi (GHS)</option>
          </select>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 14.5, marginBottom: 4, fontWeight: 600 }}>Notifications</h3>
          <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 16 }}>
            Alertes envoyées en cas de dépassement
          </div>

          <div style={switchRow}>
            <div>
              <div style={{ fontSize: 13.3, fontWeight: 500 }}>Alerte de dépassement de budget</div>
              <div style={{ fontSize: 11.8, color: "var(--slate)" }}>Notification quand une catégorie dépasse sa limite</div>
            </div>
            <div style={switchStyle(notif.overBudget)} onClick={() => toggleNotif("overBudget")}>
              <div style={knobStyle(notif.overBudget)} />
            </div>
          </div>

          <div style={switchRow}>
            <div>
              <div style={{ fontSize: 13.3, fontWeight: 500 }}>Résumé hebdomadaire</div>
              <div style={{ fontSize: 11.8, color: "var(--slate)" }}>Récapitulatif envoyé chaque lundi</div>
            </div>
            <div style={switchStyle(notif.weekly)} onClick={() => toggleNotif("weekly")}>
              <div style={knobStyle(notif.weekly)} />
            </div>
          </div>

          <div style={{ ...switchRow, borderBottom: "none" }}>
            <div>
              <div style={{ fontSize: 13.3, fontWeight: 500 }}>Rappel de saisie</div>
              <div style={{ fontSize: 11.8, color: "var(--slate)" }}>Si aucune transaction depuis 3 jours</div>
            </div>
            <div style={switchStyle(notif.reminder)} onClick={() => toggleNotif("reminder")}>
              <div style={knobStyle(notif.reminder)} />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 14.5, marginBottom: 4, fontWeight: 600 }}>Exporter mes données</h3>
          <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 16 }}>
            Télécharger l'historique complet des transactions
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-ghost" onClick={() => exportToPDF(transactions, categories)}>
              Export PDF
            </button>
            <button className="btn-ghost" onClick={() => exportToExcel(transactions, categories)}>
              Export Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}