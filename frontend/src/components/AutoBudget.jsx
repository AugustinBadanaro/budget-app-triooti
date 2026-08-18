import { useState } from "react";
import ErrorBanner from "../components/ErrorBanner";
import { getAutoBudgetSuggestions, createBudget, updateProfile } from "../services/transactions";

export default function AutoBudget({ month, budgets, categories, onBudgetsCreated }) {
const [income, setIncome] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [error, setError] = useState("");
const [saving, setSaving] = useState(false);
const [validated, setValidated] = useState(false);
const [calculating, setCalculating] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");
    setValidated(false);
    setCalculating(true);
    try {
      const data = await getAutoBudgetSuggestions(parseFloat(income));
      setSuggestions(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur : revenu invalide ou aucune catégorie disponible");
    } finally {
      setCalculating(false);
    }
  };

  const handleAmountChange = (categoryId, newAmount) => {
    setSuggestions((prev) =>
      prev.map((s) =>
        s.category_id === categoryId ? { ...s, suggested_amount: newAmount } : s
      )
    );
  };

  const handleValidate = async () => {
    if (validated) return;
    const existingCategoryIds = budgets
     .filter((b) => b.month === `${month}-01`)
      .map((b) => Number(b.category));

  const duplicates = suggestions.filter((s) => existingCategoryIds.includes(Number(s.category_id)));

  if (duplicates.length > 0) {
    setError(
      `Budget déjà existant pour : ${duplicates.map((d) => d.category_name).join(", ")}. Supprime-le d'abord ou change de mois.`
    );
    return;
  }
    setSaving(true);
      setValidated(true);
      setError("");
      try {
        await updateProfile({ monthly_income: parseFloat(income) });
        const created = await Promise.all(
          suggestions.map((s) =>
            createBudget({
              category: s.category_id,
              limit_amount: parseFloat(s.suggested_amount),
              month: `${month}-01`,
            })
          )
        );
        onBudgetsCreated(created);
        setSuggestions([]);
        setIncome("");
      } catch (err) {
        setError(err.response?.data?.detail || "Erreur lors de l'enregistrement des budgets");
      } finally {
        setSaving(false);
      }
    };

    const groupLabels = {
      essential: "Essentiel",
      variable: "Variable",
      savings: "Épargne",
    };

    return (
    <div>
      <h3>Répartition automatique du revenu</h3>
      {error && <ErrorBanner message={error} />}

      <form onSubmit={handleCalculate} style={{ display: "flex", gap: 10, alignItems: "flex-end", marginBottom: 16 }}>
        <input
          type="number"
          step="0.01"
          placeholder="Revenu mensuel"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          style={{ width: 200 }}
        />
        <button className="btn-primary" type="submit" disabled={calculating}>
          {calculating ? "Calcul..." : "Calculer"}
        </button>
      
      </form>

      {suggestions.length > 0 && (
        <div>
          {suggestions.length > 0 && (
            <div>
              <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
                {suggestions.map((s) => (
                  <div
                    key={s.category_id}
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 14,
                      padding: "12px 16px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.category_name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--slate)" }}>{groupLabels[s.group] || s.group}</div>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={s.suggested_amount}
                      onChange={(e) => handleAmountChange(s.category_id, e.target.value)}
                      style={{ width: 130, textAlign: "right" }}
                    />
                  </div>
                ))}
              </div>
              <button
                className="btn-primary"
                onClick={handleValidate}
                disabled={saving || validated}
              >
                {saving ? "Enregistrement..." : "Valider et créer les budgets"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}