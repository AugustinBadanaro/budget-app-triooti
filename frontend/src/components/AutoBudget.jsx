import { useState } from "react";
import { getAutoBudgetSuggestions, createBudget } from "../services/transactions";

export default function AutoBudget({ month, onBudgetsCreated }) {
  const [income, setIncome] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await getAutoBudgetSuggestions(parseFloat(income));
      setSuggestions(data);
    } catch (err) {
      setError("Erreur : revenu invalide ou aucune catégorie disponible");
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
    setSaving(true);
    setError("");
    try {
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
      setError("Erreur lors de l'enregistrement des budgets");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h3>Répartition automatique du revenu</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCalculate}>
        <input
          type="number"
          step="0.01"
          placeholder="Revenu mensuel"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
        <button type="submit">Calculer</button>
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
          <button onClick={handleValidate} disabled={saving}>
            {saving ? "Enregistrement..." : "Valider et créer les budgets"}
          </button>
        </div>
      )}
    </div>
  );
}