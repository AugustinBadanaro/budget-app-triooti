import { useEffect, useState } from "react";
import { getTransactions, getBudgets, getCategories } from "../services/transactions";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import BudgetProgress from "../components/BudgetProgress";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [t, b, c] = await Promise.all([
          getTransactions(),
          getBudgets(),
          getCategories(),
        ]);
        setTransactions(t);
        setBudgets(b);
        setCategories(c);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <button onClick={handleLogout}>Déconnexion</button>
      <TransactionForm
        categories={categories}
        onTransactionAdded={(newT) => setTransactions([newT, ...transactions])}
      />
      <BudgetProgress budgets={budgets} categories={categories} transactions={transactions} />

      <h2>Transactions récentes</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.date} — {t.category_name || t.category} — {t.amount} FCFA
          </li>
        ))}
      </ul>
    </div>
  );
}