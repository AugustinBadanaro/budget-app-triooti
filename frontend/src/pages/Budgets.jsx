import { useOutletContext } from "react-router-dom";
import BudgetProgress from "../components/BudgetProgress";
import AutoBudget from "../components/AutoBudget";
import BudgetAlertBanner from "../components/BudgetAlertBanner";

export default function Budgets() {
  const { transactions, budgets, setBudgets, categories, selectedMonth } = useOutletContext();

  const filteredTransactions = transactions.filter((t) => t.date?.startsWith(selectedMonth));
  const monthBudgets = budgets.filter((b) => b.month?.startsWith(selectedMonth));

  return (
    <div>
      <h2>Budgets</h2>

      <BudgetAlertBanner
        budgets={monthBudgets}
        categories={categories}
        transactions={filteredTransactions}
        selectedMonth={selectedMonth}
      />

      <AutoBudget
        month={selectedMonth}
        budgets={budgets}
        onBudgetsCreated={(newBudgets) => setBudgets([...budgets, ...newBudgets])}
      />

      <BudgetProgress
        budgets={monthBudgets}
        categories={categories}
        transactions={filteredTransactions}
        onDelete={(id) => setBudgets(budgets.filter((b) => b.id !== id))}
      />
    </div>
  );
}