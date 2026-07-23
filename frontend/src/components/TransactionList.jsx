import { useState } from "react";
import { deleteTransaction, updateTransaction } from "../services/transactions";

export default function TransactionList({
  transactions,
  categories,
  onDelete,
  onUpdate,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "Inconnue";

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette transaction ?")) return;

    try {
      await deleteTransaction(id);
      onDelete(id);
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditData({
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      description: transaction.description,
    });
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
    } catch (err) {
      alert("Erreur lors de la modification");
    }
  };

  if (transactions.length === 0) {
    return <p>Aucune transaction.</p>;
  }

  return (
    <table
      border="1"
      cellPadding="6"
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr>
          <th>Date</th>
          <th>Catégorie</th>
          <th>Type</th>
          <th>Montant</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t) =>
          editingId === t.id ? (
            <tr key={t.id}>
              <td>{t.date}</td>

              <td>
                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <select
                  value={editData.type}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="income">Revenu</option>
                  <option value="expense">Dépense</option>
                </select>
              </td>

              <td>
                <input
                  type="number"
                  step="0.01"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount: e.target.value,
                    })
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                />
              </td>

              <td>
                <button onClick={() => saveEdit(t.id)}>
                  Enregistrer
                </button>

                <button onClick={cancelEdit}>
                  Annuler
                </button>
              </td>
            </tr>
          ) : (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{getCategoryName(t.category)}</td>
              <td>{t.type === "income" ? "Revenu" : "Dépense"}</td>
              <td>{t.amount} FCFA</td>
              <td>{t.description}</td>

              <td>
                <button onClick={() => startEdit(t)}>
                  Modifier
                </button>

                <button onClick={() => handleDelete(t.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}