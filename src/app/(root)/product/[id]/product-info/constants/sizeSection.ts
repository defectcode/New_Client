

export const sizeStandards: Record<"US" | "EU" | "UK", string[]> = {
  US: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  EU: ["34", "36", "38", "40", "42", "44", "46", "48"],
  UK: ["4", "6", "8", "10", "12", "14", "16", "18"],
};

export const tableRow = [
  { size: "Chest Circumference", cm: 75, dm: 7.5 },
  { size: "Length", cm: 83, dm: 8.3 },
  { size: "Weight", cm: 105, dm: 10.5 },
];

export const tableRows = [
  { standard: "XXS", size: 42 },
  { standard: "XS", size: 44 },
  { standard: "S", size: 46 },
  { standard: "M", size: 48 },
  { standard: "L", size: 50 },
  { standard: "XL", size: 52 },
  { standard: "XXL", size: 54 },
  { standard: "XXXL", size: 56 },
];