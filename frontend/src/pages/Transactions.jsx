import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionFilters from "../components/TransactionFilters";

export default function Transactions() {
  const { transactions, setTransactions, categories, selectedMonth, setSelectedMonth } = useOutletContext();

  const [filters, setFilters] = useState({ category: "", minAmount: "", maxAmount: "", search: "" });

  const filtered = transactions.filter((t) => {
    if (!t.date?.startsWith(selectedMonth)) return false;
    if (filters.category && Number(t.category) !== Number(filters.category)) return false;
    if (filters.minAmount && parseFloat(t.amount) < parseFloat(filters.minAmount)) return false;
    if (filters.maxAmount && parseFloat(t.amount) > parseFloat(filters.maxAmount)) return false;
    if (filters.search && !t.description?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h2>Transactions</h2>

      <div style={{ margin: "16px 0" }}>
        <label>Mois : </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <TransactionForm
        categories={categories}
        onTransactionAdded={(newT) => setTransactions([newT, ...transactions])}
        selectedMonth={selectedMonth}
      />

      <TransactionFilters categories={categories} onFilterChange={setFilters} />

      <TransactionList
        transactions={filtered}
        categories={categories}
        onDelete={(id) => setTransactions(transactions.filter((t) => t.id !== id))}
        onUpdate={(updated) =>
          setTransactions(transactions.map((t) => (t.id === updated.id ? updated : t)))
        }
      />
    </div>
  );
}