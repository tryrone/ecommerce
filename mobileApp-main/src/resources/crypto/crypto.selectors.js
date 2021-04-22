const SIGNIFICANT_DIGITS_AMOUNT = 3;

export const getCryptoInfo = ({ crypto }) => crypto;

export const getCryptoHistory = ({ crypto }) => {
  const minRate = crypto.cryptoHistory.reduce(
    (min, element) => (min < element ? min : element),
    +Infinity,
  );
  const maxRate = crypto.cryptoHistory.reduce(
    (max, element) => (max > element ? max : element),
    -Infinity,
  );

  const rateSpan = maxRate - minRate;
  const exponent = parseInt(rateSpan.toExponential().split('e')[1], 10);
  const decimalPlaces = Math.max(0, -(exponent - SIGNIFICANT_DIGITS_AMOUNT));

  const cryptoHistory = crypto.cryptoHistory.map((value) => {
    return value.toFixed(decimalPlaces);
  });

  return {
    cryptoHistory,
    decimalPlaces,
  };
};
