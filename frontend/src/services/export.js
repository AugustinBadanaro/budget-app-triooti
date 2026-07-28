import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToCSV = (transactions, categories) => {
  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  const header = ["Date", "Catégorie", "Type", "Montant", "Description"];
  const rows = transactions.map((t) => [
    t.date,
    getCategoryName(t.category),
    t.type === "income" ? "Revenu" : "Dépense",
    t.amount,
    t.description || "",
  ]);

  const csvContent = [header, ...rows].map((row) => row.join(";")).join("\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToPDF = (transactions, categories) => {
  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  const doc = new jsPDF();
  doc.text("Historique des transactions", 14, 15);

  autoTable(doc, {
    startY: 22,
    head: [["Date", "Catégorie", "Type", "Montant", "Description"]],
    body: transactions.map((t) => [
      t.date,
      getCategoryName(t.category),
      t.type === "income" ? "Revenu" : "Dépense",
      `${t.amount} F`,
      t.description || "",
    ]),
  });

  doc.save("transactions.pdf");
};