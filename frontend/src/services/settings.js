const CURRENCY_KEY = "app_currency";
const THRESHOLD_KEY = "app_alert_threshold";
const DARKMODE_KEY = "app_dark_mode";


export const getCurrency = () => localStorage.getItem(CURRENCY_KEY) || "XOF";
export const setCurrency = (value) => localStorage.setItem(CURRENCY_KEY, value);

export const getAlertThreshold = () => Number(localStorage.getItem(THRESHOLD_KEY)) || 100;
export const setAlertThreshold = (value) => localStorage.setItem(THRESHOLD_KEY, value);

export const getDarkMode = () => localStorage.getItem(DARKMODE_KEY) === "true";
export const setDarkMode = (value) => localStorage.setItem(DARKMODE_KEY, value);

export const getExchangeRate = () => parseFloat(localStorage.getItem("app_exchange_rate")) || 655;
export const setExchangeRate = (rate) => localStorage.setItem("app_exchange_rate", rate);