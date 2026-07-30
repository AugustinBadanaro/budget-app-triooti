import { useState } from "react";
import { createCategory, deleteCategory } from "../services/transactions";

export default function CategoryManager({ categories, onCategoriesChange }) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("essential");
  const [error, setError] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const newCat = await createCategory({ name, group });
      onCategoriesChange([...categories, newCat]);
      setName("");
    } catch (err) {
      setError("Erreur : nom déjà utilisé ou invalide");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ? Les transactions liées seront affectées.")) return;
    try {
      await deleteCategory(id);
      onCategoriesChange(categories.filter((c) => c.id !== id));
    } catch (err) {
      alert("Erreur : impossible de supprimer (catégorie utilisée par des transactions ?)");
    }
  };

  return (
    <div>
      <h3>Catégories</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCreate} style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: 200 }}
        />
        <select value={group} onChange={(e) => setGroup(e.target.value)} style={{ width: 140 }}>
          <option value="essential">Essentiel</option>
          <option value="variable">Variable</option>
          <option value="savings">Épargne</option>
        </select>
        <button className="btn-primary" type="submit">Ajouter</button>
      </form>

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {categories.map((c) => (
          <li key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
            <span>{c.name} ({c.group})</span>
            <button className="btn-ghost" onClick={() => handleDelete(c.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}