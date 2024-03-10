export const renderRangeNumber = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
};
