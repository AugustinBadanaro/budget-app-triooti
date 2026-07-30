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

      <div
        style={{
          display: "flex",
            background: "var(--rose-soft)",
            borderRadius: 11,
            padding: 4,
            marginBottom: 18,
        }}
      >
        <button
          type="button"
          onClick={() => setType("expense")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            border: "none",
            padding: 10,
            borderRadius: 9,
            fontSize: 13.3,
            fontWeight: 600,
            cursor: "pointer",
            color: "var(--rose)",
            background: type === "expense" ? "var(--white)" : "transparent",
            opacity: type === "expense" ? 1 : 0.55,
            boxShadow: type === "expense" ? "0 2px 6px rgba(0,0,0,.06)" : "none",
          }}
        >
          ↓ Dépense
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            border: "none",
            padding: 10,
            borderRadius: 9,
            fontSize: 13.3,
            fontWeight: 600,
            cursor: "pointer",
            color: "var(--rose)",
            background: type === "income" ? "var(--white)" : "transparent",
            opacity: type === "income" ? 1 : 0.55,
            boxShadow: type === "income" ? "0 2px 6px rgba(0,0,0,.06)" : "none",
          }}
        >
          ↑ Revenu
        </button>
      </div>

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

      <button className="btn-primary" type="submit" style={{ marginTop: 8, marginBottom: 24 }}>
        Ajouter
      </button>
    </form>
  );
}