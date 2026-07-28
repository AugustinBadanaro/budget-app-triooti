import { useState } from "react";

export default function TransactionFilters({ categories, onFilterChange }) {
  const [category, setCategory] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [search, setSearch] = useState("");

  const applyFilters = (next) => {
    const filters = { category, minAmount, maxAmount, search, ...next };
    setCategory(filters.category);
    setMinAmount(filters.minAmount);
    setMaxAmount(filters.maxAmount);
    setSearch(filters.search);
    onFilterChange(filters);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "flex-end" }}>
      <div className="field" style={{ marginBottom: 0 }}>
        <label>Catégorie</label>
        <select value={category} onChange={(e) => applyFilters({ category: e.target.value })} style={{ width: "auto", minWidth: 140 }}>
          <option value="">Toutes</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label>Montant min.</label>
        <input
          type="number"
          placeholder="0"
          value={minAmount}
          onChange={(e) => applyFilters({ minAmount: e.target.value })}
          style={{ width: 110 }}
        />
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label>Montant max.</label>
        <input
          type="number"
          placeholder="Aucune limite"
          value={maxAmount}
          onChange={(e) => applyFilters({ maxAmount: e.target.value })}
          style={{ width: 130 }}
        />
      </div>

      <div className="field" style={{ marginBottom: 0, flex: 1, minWidth: 180 }}>
        <label>Rechercher</label>
        <input
          type="text"
          placeholder="Description…"
          value={search}
          onChange={(e) => applyFilters({ search: e.target.value })}
        />
      </div>
    </div>
  );
}