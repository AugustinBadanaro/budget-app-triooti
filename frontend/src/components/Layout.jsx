// frontend/src/components/Layout.jsx
import { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { getTransactions, getBudgets, getCategories, getProfile } from "../services/transactions";
import Spinner from "./Spinner";
import ErrorBanner from "./ErrorBanner";

export default function Layout() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [t, b, c, p] = await Promise.all([
        getTransactions(),
        getBudgets(),
        getCategories(),
        getProfile(),
      ]);
      setTransactions(t);
      setBudgets(b);
      setCategories(c);
      setMonthlyIncome(parseFloat(p.monthly_income) || 0);
    } catch (err) {
      setError("Impossible de charger vos données. Réessayez.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const context = {
    transactions,
    setTransactions,
    budgets,
    setBudgets,
    categories,
    setCategories,
    monthlyIncome,
    setMonthlyIncome,
    selectedMonth,
    setSelectedMonth,
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "32px 40px" }}>
        {loading && <Spinner />}
        {!loading && error && <ErrorBanner message={error} onRetry={loadAll} />}
        {!loading && !error && <Outlet context={context} />}
      </div>
    </div>
  );
}