const SYMBOLS = { XOF: "FCFA", EUR: "€", USD: "$", GHS: "₵" };

export const formatAmount = (amount) => {
  const currency = localStorage.getItem("app_currency") || "XOF";
  const rate = parseFloat(localStorage.getItem("app_exchange_rate")) || 1;
  const symbol = SYMBOLS[currency] || currency;
  const converted = parseFloat(amount) / (currency === "XOF" ? 1 : rate);
  const value = converted.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  return `${value} ${symbol}`;
};