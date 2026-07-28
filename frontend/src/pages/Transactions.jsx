import { useOutletContext } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const { transactions, setTransactions, categories, selectedMonth, setSelectedMonth } = useOutletContext();

  const filtered = transactions.filter((t) => t.date?.startsWith(selectedMonth));

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
      />

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