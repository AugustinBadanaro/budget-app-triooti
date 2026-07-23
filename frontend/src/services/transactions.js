import api from "./api";

export const getTransactions = () => api.get("transactions/").then((r) => r.data);
export const createTransaction = (data) => api.post("transactions/", data).then((r) => r.data);
export const deleteTransaction = (id) => api.delete(`transactions/${id}/`);

export const getBudgets = () => api.get("budgets/").then((r) => r.data);
export const getCategories = () => api.get("categories/").then((r) => r.data);

export const getAutoBudgetSuggestions = (monthly_income) =>
  api.post("budgets/auto/", { monthly_income }).then((r) => r.data);

export const createBudget = (data) => api.post("budgets/", data).then((r) => r.data);