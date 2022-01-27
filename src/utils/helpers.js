// Truncating number into having specific decimal places without rounding
export const truncateNumber = (number, decimals = 2) => {
  if (number !== null) {
    return (Math.floor(number * (10 ** decimals)) / (10 ** decimals)).toFixed(decimals);
  }
  return 'N/A';
};

// Get the percentage of a value from a range of number
export const getPercentageOfValueFromRange = (value, min, max) => ((value - min) * 100) / (max - min);

// Format number into shortered k format for thousands (ex: 1,200 to 1.2k)
export const kFormatter = (number, decimals = 1) => {
  if (Math.abs(number) > 999) {
    return `${Math.sign(number) * ((Math.abs(number) / 1000).toFixed(1))}k`;
  }
  return truncateNumber(Math.sign(number) * Math.abs(number), decimals);
};
