import { useEffect, useState } from "react";
import { getTransactions, getBudgets, getCategories } from "../services/transactions";
import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import BudgetProgress from "../components/BudgetProgress";
import ExpenseChart from "../components/ExpenseChart";
import TransactionList from "../components/TransactionList";
import AutoBudget from "../components/AutoBudget";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

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

  const filteredTransactions = transactions.filter((t) => t.date?.startsWith(selectedMonth));
  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <button onClick={handleLogout}>Déconnexion</button>

      <div>
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

      <AutoBudget
        month={selectedMonth}
        onBudgetsCreated={(newBudgets) => setBudgets([...budgets, ...newBudgets])}
      />
      
      <BudgetProgress budgets={budgets} categories={categories} transactions={filteredTransactions} />

      <ExpenseChart transactions={filteredTransactions} categories={categories} />

      <h2>Transactions récentes</h2>
      <TransactionList
        transactions={filteredTransactions}
        categories={categories}
        onDelete={(id) => setTransactions(transactions.filter((t) => t.id !== id))}
      />
    </div>
  );
}