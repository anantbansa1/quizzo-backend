export const cleanString = (categoryString: string): string[] => {
  const cleanedString = categoryString.slice(2, -2);
  const entries = cleanedString.split(/\),\s*\(/);

  return entries.map((entry) => {
    const parts = entry.split(/,\s*/);
    return parts[0].replace(/^['"\s]*|['"\s]*$/g, "").trim();
  });
};
