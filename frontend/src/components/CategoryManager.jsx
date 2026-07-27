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

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          <option value="essential">Essentiel</option>
          <option value="variable">Variable</option>
          <option value="savings">Épargne</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>
            {c.name} ({c.group})
            <button onClick={() => handleDelete(c.id)} style={{ marginLeft: "10px" }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}