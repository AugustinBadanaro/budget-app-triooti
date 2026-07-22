import { useState } from "react";
import { createTransaction } from "../services/transactions";

export default function TransactionForm({ categories, onTransactionAdded }) {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [statusMessage, setStatusMessage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatusMessage(null);
    try {
      const result = await createTransaction({
        amount: parseFloat(amount),
        category: categoryId,
        description,
        date: new Date().toISOString().split("T")[0],
        type,
      });
      setStatusMessage(result.budget_status?.message || null);
      setAmount("");
      setDescription("");
      onTransactionAdded(result);
    } catch (err) {
      setError("Erreur lors de l'ajout de la transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nouvelle transaction</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {statusMessage && <p style={{ color: "orange" }}>{statusMessage}</p>}

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="">-- Choisir une catégorie --</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="expense">Dépense</option>
        <option value="income">Revenu</option>
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

      <button type="submit">Ajouter</button>
    </form>
  );
}