export const getColumnClass = (length) => {
  if (length === 1) return "one-column";
  if (length === 2) return "two-columns";
  return "three-columns";
};
