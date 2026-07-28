const CURRENCY_KEY = "app_currency";
const NOTIF_KEY = "app_notifications";

export const getCurrency = () => localStorage.getItem(CURRENCY_KEY) || "XOF";
export const setCurrency = (value) => localStorage.setItem(CURRENCY_KEY, value);

export const getNotifications = () => {
  const stored = localStorage.getItem(NOTIF_KEY);
  return stored ? JSON.parse(stored) : { overBudget: true, weekly: false, reminder: true };
};
export const setNotifications = (prefs) => localStorage.setItem(NOTIF_KEY, JSON.stringify(prefs));