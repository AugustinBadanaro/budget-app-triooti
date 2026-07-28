import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { getTransactions, getBudgets, getCategories } from "../services/transactions";

export default function Layout() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    const load = async () => {
      try {
        const [t, b, c] = await Promise.all([getTransactions(), getBudgets(), getCategories()]);
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

  if (loading) return <p style={{ padding: 32 }}>Chargement...</p>;

  const context = {
    transactions,
    setTransactions,
    budgets,
    setBudgets,
    categories,
    setCategories,
    selectedMonth,
    setSelectedMonth,
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "32px 40px" }}>
        <Outlet context={context} />
      </div>
    </div>
  );
}