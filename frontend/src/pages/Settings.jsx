import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import CategoryManager from "../components/CategoryManager";
import ErrorBanner from "../components/ErrorBanner";
import { exportToExcel, exportToPDF } from "../services/export";
import { getCurrency, setCurrency as saveCurrency, getExchangeRate, setExchangeRate, getAlertThreshold, setAlertThreshold, getDarkMode, setDarkMode } from "../services/settings";

export default function Settings() {
  const { categories, setCategories, transactions, budgets, setBudgets, selectedMonth } = useOutletContext();

  const [currency, setCurrencyState] = useState(getCurrency());
  const [exchangeRate, setExchangeRateState] = useState(getExchangeRate());
  const [threshold, setThreshold] = useState(getAlertThreshold());
  const [darkMode, setDarkModeState] = useState(getDarkMode());
  const [exportError, setExportError] = useState(null);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingExcel, setExportingExcel] = useState(false);

  const handleCurrencyChange = (value) => {
    setCurrencyState(value);
    saveCurrency(value);
  };

  const handleRateChange = (value) => {
    setExchangeRateState(value);
    setExchangeRate(value);
};

  const handleThresholdChange = (value) => {
    setThreshold(Number(value));
    setAlertThreshold(value);
  };

  const handleDarkModeToggle = () => {
    const next = !darkMode;
    setDarkModeState(next);
    setDarkMode(next);
    document.body.classList.toggle("dark", next);
  };

  const handleExportPDF = async () => {
    setExportError(null);
    setExportingPDF(true);
    try {
      await exportToPDF(transactions, categories);
    } catch (err) {
      setExportError("Erreur lors de l'export PDF.");
    } finally {
      setExportingPDF(false);
    }
  };

  const handleExportExcel = async () => {
    setExportError(null);
    setExportingExcel(true);
    try {
      await exportToExcel(transactions, categories);
    } catch (err) {
      setExportError("Erreur lors de l'export Excel.");
    } finally {
      setExportingExcel(false);
    }
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
          <h3 style={{ fontSize: 14.5, marginBottom: 4, fontWeight: 600 }}>Alertes de budget</h3>
          <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 16 }}>
            Seuil à partir duquel une alerte s'affiche sur la page Budgets
          </div>
          <div className="field">
            <label>Seuil d'alerte : {threshold}%</label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={threshold}
              onChange={(e) => handleThresholdChange(e.target.value)}
            />
          </div>

          <h3 style={{ fontSize: 14.5, margin: "20px 0 4px", fontWeight: 600 }}>Apparence</h3>
          <div style={switchRow}>
            <div>
              <div style={{ fontSize: 13.3, fontWeight: 500 }}>Mode sombre</div>
              <div style={{ fontSize: 11.8, color: "var(--slate)" }}>Change l'apparence de l'application</div>
            </div>
            <div style={switchStyle(darkMode)} onClick={handleDarkModeToggle}>
              <div style={knobStyle(darkMode)} />
            </div>
          </div>
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

          {currency !== "XOF" && (
            <div className="field" style={{ marginTop: 12 }}>
              <label>1 {currency} = {exchangeRate} FCFA</label>
              <input
                type="number"
                step="1"
                min="1"
                value={exchangeRate}
                onChange={(e) => handleRateChange(e.target.value)}
                placeholder="Ex : 655"
              />
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: 14.5, marginBottom: 4, fontWeight: 600 }}>Exporter mes données</h3>
          <div style={{ fontSize: 12.3, color: "var(--slate)", marginBottom: 16 }}>
            Télécharger l'historique complet des transactions
          </div>
          {exportError && <ErrorBanner message={exportError} />}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-ghost" onClick={handleExportPDF} disabled={exportingPDF}>
              {exportingPDF ? "Export..." : "Export PDF"}
            </button>
            <button className="btn-ghost" onClick={handleExportExcel} disabled={exportingExcel}>
              {exportingExcel ? "Export..." : "Export Excel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}