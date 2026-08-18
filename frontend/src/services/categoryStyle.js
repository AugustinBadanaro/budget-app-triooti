const PALETTE = [
  { bg: "#FBE4EE", color: "#D6336C" }, // rose
  { bg: "#FBF1DD", color: "#B8860B" }, // ambre
  { bg: "#E7EEF7", color: "#3A6EA5" }, // bleu
  { bg: "#EFEAF5", color: "#6A4C93" }, // violet
  { bg: "#E6F5F0", color: "#2F9E64" }, // vert
  { bg: "#FDEBEB", color: "#C2410C" }, // orange
  { bg: "#E8F4F8", color: "#0E7490" }, // cyan
  { bg: "#F3EDE4", color: "#92702C" }, // marron
  { bg: "#FDE8F5", color: "#A3268C" }, // magenta
  { bg: "#EAF6E8", color: "#4C8C2B" }, // vert clair
  { bg: "#FFF0E0", color: "#C97A1E" }, // orange clair
  { bg: "#E5EAFB", color: "#4453C4" }, // indigo
  { bg: "#FBE9E9", color: "#B0413E" }, // rouge brique
  { bg: "#E8F7F5", color: "#1C8C7A" }, // turquoise
  { bg: "#F5EAF9", color: "#8B3FA8" }, // pourpre
  { bg: "#F9F3E3", color: "#8C7020" }, // doré
];

export const getCategoryStyle = (categoryId) => {
  const index = Number(categoryId) % PALETTE.length;
    return PALETTE[index];
};
