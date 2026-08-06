import { useState } from "react";
import { deleteTransaction, updateTransaction } from "../services/transactions";
import { formatAmount } from "../services/currency";
import { getCategoryStyle } from "../services/categoryStyle";

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "13px 22px",
  borderBottom: "1px dashed var(--line)",
};

export default function TransactionList({ transactions, categories, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette transaction ?")) return;
    try {
      await deleteTransaction(id);
      onDelete(id);
    } catch{
      alert("Erreur lors de la suppression");
    }
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditData({ amount: t.amount, category: t.category, type: t.type, description: t.description });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    try {
      const updated = await updateTransaction(id, {
        amount: parseFloat(editData.amount),
        category: editData.category,
        type: editData.type,
        description: editData.description,
      });
      onUpdate(updated);
      cancelEdit();
    } catch{
      alert("Erreur lors de la modification");
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "60px 24px" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "var(--rose-soft)",
            color: "var(--rose)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
            fontSize: 24,
          }}
        >
          !
        </div>
        <h3 style={{ marginBottom: 6, fontFamily: "Inter, sans-serif" }}>Aucune transaction</h3>
        <p style={{ color: "var(--slate)", fontSize: 13.3 }}>
          Ajoutez votre première dépense ou revenu pour commencer.
        </p>
      </div>
    );
  }

  return (
    <div
      className="card"
      style={{ padding: 0, position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundImage:
            "radial-gradient(circle at 10px 4px, var(--rose-pale) 4px, transparent 4.5px)",
          backgroundSize: "20px 8px",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div
        style={{
          padding: "18px 22px 6px",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".04em",
          textTransform: "uppercase",
          color: "var(--slate-light)",
        }}
      >
        Transactions
      </div>

      {transactions.map((t) =>
        editingId === t.id ? (
          <div key={t.id} style={{ ...rowStyle, gap: 10, flexWrap: "wrap" }}>
            <select
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              style={{ width: "auto" }}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select
              value={editData.type}
              onChange={(e) => setEditData({ ...editData, type: e.target.value })}
              style={{ width: "auto" }}
            >
              <option value="expense">Dépense</option>
              <option value="income">Revenu</option>
            </select>
            <input
              type="number"
              step="0.01"
              value={editData.amount}
              onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
              style={{ width: 110 }}
            />
            <input
              type="text"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              style={{ width: 160 }}
            />
            <button className="btn-primary" onClick={() => saveEdit(t.id)}>Enregistrer</button>
            <button className="btn-ghost" onClick={cancelEdit}>Annuler</button>
          </div>
        ) : (
          <div key={t.id} style={rowStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              
              <div>
                <div style={{ fontSize: 13.8, fontWeight: 600 }}>{t.description || "—"}</div>
                <div style={{ fontSize: 12, marginTop: 1 }}>
                  <span style={{ color: getCategoryStyle(t.category).color, fontWeight: 700 }}>
                    {getCategoryName(t.category)}
                  </span>
                  <span style={{ color: "var(--slate)" }}> · {t.date}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 13.8,
                  fontWeight: 500,
                  color: t.type === "income" ? "var(--success)" : "var(--alert)",
                }}
              >
                {t.type === "income" ? "+" : "-"} {formatAmount(t.amount)}
              </div>
              <button className="btn-ghost" onClick={() => startEdit(t)}>Modifier</button>
              <button className="btn-ghost" onClick={() => handleDelete(t.id)}>Supprimer</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}