import { useOutletContext } from "react-router-dom";
import BudgetProgress from "../components/BudgetProgress";
import AutoBudget from "../components/AutoBudget";
import BudgetAlertBanner from "../components/BudgetAlertBanner";

export default function Budgets() {
  const { transactions, budgets, setBudgets, categories, selectedMonth } = useOutletContext();

  const filtered = transactions.filter((t) => t.date?.startsWith(selectedMonth));

  return (
    <div>
      <h2>Budgets</h2>

      <BudgetAlertBanner
        budgets={budgets}
        categories={categories}
        transactions={filtered}
        selectedMonth={selectedMonth}
      />

      <AutoBudget
        month={selectedMonth}
        budgets={budgets}
        onBudgetsCreated={(newBudgets) => setBudgets([...budgets, ...newBudgets])}
      />

      <BudgetProgress
        budgets={budgets}
        categories={categories}
        transactions={filtered}
        onDelete={(id) => setBudgets(budgets.filter((b) => b.id !== id))}
      />
    </div>
  );
}