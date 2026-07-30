const PALETTE = [
  { bg: "#FBE4EE", color: "#D6336C" }, // rose
  { bg: "#FBF1DD", color: "#B8860B" }, // ambre
  { bg: "#E7EEF7", color: "#3A6EA5" }, // bleu
  { bg: "#EFEAF5", color: "#6A4C93" }, // violet
  { bg: "#E6F5F0", color: "#2F9E64" }, // vert
  { bg: "#FDEBEB", color: "#C2410C" }, // orange
  { bg: "#E8F4F8", color: "#0E7490" }, // cyan
  { bg: "#F3EDE4", color: "#92702C" }, // marron
];

export const getCategoryStyle = (categoryId) => {
  const index = Number(categoryId) % PALETTE.length;
  return PALETTE[index];
};