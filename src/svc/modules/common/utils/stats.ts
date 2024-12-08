export const calculateMean = (data: (number | null)[]) => {
  const filteredData = data.filter((val): val is number => val !== null);
  return filteredData.reduce((a, b) => a + b, 0) / filteredData.length;
};

export const calculateStd = (data: (number | null)[], mean: number) => {
  const filteredData = data.filter((val): val is number => val !== null);
  const variance =
    filteredData.reduce((sum, val) => sum + (val - mean) ** 2, 0) / filteredData.length;
  return Math.sqrt(variance);
};
