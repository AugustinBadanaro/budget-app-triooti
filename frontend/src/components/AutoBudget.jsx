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
          <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Groupe</th>
                <th>Montant proposé</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((s) => (
                <tr key={s.category_id}>
                  <td>{s.category_name}</td>
                  <td>{s.group}</td>
                  <td>
                    <input
                      type="number"
                      step="0.01"
                      value={s.suggested_amount}
                      onChange={(e) => handleAmountChange(s.category_id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn-primary"
            onClick={handleValidate}
            disabled={saving || validated}
            style={{ marginTop: 14 }}
          >
            {saving ? "Enregistrement..." : "Valider et créer les budgets"}
          </button>
        </div>
      )}
    </div>
  );
}