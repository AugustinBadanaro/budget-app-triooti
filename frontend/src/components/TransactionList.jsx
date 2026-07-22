import { deleteTransaction } from "../services/transactions";

export default function TransactionList({ transactions, categories, onDelete }) {
  const getCategoryName = (id) => categories.find((c) => c.id === id)?.name || "Inconnue";

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette transaction ?")) return;
    try {
      await deleteTransaction(id);
      onDelete(id);
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  if (transactions.length === 0) return <p>Aucune transaction.</p>;

  return (
    <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Catégorie</th>
          <th>Type</th>
          <th>Montant</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{getCategoryName(t.category)}</td>
            <td>{t.type === "income" ? "Revenu" : "Dépense"}</td>
            <td>{t.amount} FCFA</td>
            <td>{t.description}</td>
            <td>
              <button onClick={() => handleDelete(t.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}