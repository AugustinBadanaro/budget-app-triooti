import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";

export const exportToExcel = (transactions, categories) => {
  const getCategoryName = (id) => categories.find((c) => Number(c.id) === Number(id))?.name || "Inconnue";

  const rows = transactions.map((t) => ({
    Date: t.date,
    Catégorie: getCategoryName(t.category),
    "Dépense",
    Montant: parseFloat(t.amount),
    Description: t.description || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  XLSX.writeFile(workbook, "transactions.xlsx");
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
      "Dépense",
      `${t.amount} F`,
      t.description || "",
    ]),
  });

  doc.save("transactions.pdf");
};