const SYMBOLS = { XOF: "FCFA", EUR: "€", USD: "$", GHS: "₵" };

export const formatAmount = (amount) => {
  const currency = localStorage.getItem("app_currency") || "XOF";
  const symbol = SYMBOLS[currency] || currency;
  const value = parseFloat(amount).toLocaleString("fr-FR");
  return currency === "EUR" || currency === "USD" ? `${value} ${symbol}` : `${value} ${symbol}`;
};