import { useState } from "react";
import { createTransaction } from "../services/transactions";
import ErrorBanner from "./ErrorBanner";

export default function TransactionForm({ categories, onTransactionAdded, selectedMonth }) {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState(new Date().getDate());
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setStatusMessage(null);
    try {
      const result = await createTransaction({
        amount: parseFloat(amount),
        category: categoryId,
        description,
        type: "expense",
        date: `${selectedMonth}-${String(day).padStart(2, "0")}`,
      });
      setStatusMessage(result.budget_status?.message || null);
      setAmount("");
      setDescription("");
      setDay(new Date().getDate());
      onTransactionAdded(result);
    } catch (err) {
      setFormError(err.response?.data?.detail || "Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h3>Nouvelle dépense</h3>

      {formError && <ErrorBanner message={formError} />}
      {statusMessage && <p style={{ color: "orange" }}>{statusMessage}</p>}

      <div className="field">
        <label>Jour du mois</label>
        <input
          type="number"
          min="1"
          max="31"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </div>

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">-- Choisir une catégorie --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        type="number"
        step="0.01"
        placeholder="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="btn-primary"
        type="submit"
        disabled={submitting}
        style={{
          marginTop: 8,
          marginBottom: 24,
          width: "fit-content",
          alignSelf: "flex-start",
        }}
      >
        {submitting ? "Enregistrement..." : "Valider"}
      </button>
    </form>
  );
}