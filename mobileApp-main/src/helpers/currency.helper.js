// import Big from 'big.js';

// import Frank from 'assets/icons/frank.svg';
// import Bitcoin from 'assets/icons/bitcoin.svg';
// import Ethereum from 'assets/icons/ethereum.svg';
// import Celo from 'assets/icons/celo.svg';

// export const CRYPTO_OPERATIONS = {
//   BUY_SELL: 'Buy/Sell',
//   SEND: 'Send',
// };

// export const CURRENCIES = {
//   CRYPTO: {
//     BITCOIN: 'Bitcoin',
//     ETHEREUM: 'Ethereum',
//     CELO: 'Celo',
//   },
//   REAL: {
//     FRANK: 'Frank',
//     DOLAR: 'Dollar',
//   },
//   COINBASE_TEST_SYMBOLS: {
//     BITCOIN: 'BTC_TEST',
//     ETHEREUM: 'ETH_TEST',
//   },
// };

// export const getCurrencyIcon = (currency) => {
//   switch (currency) {
//     case CURRENCIES.CRYPTO.BITCOIN:
//       return Bitcoin;
//     case CURRENCIES.CRYPTO.ETHEREUM:
//       return Ethereum;
//     case CURRENCIES.CRYPTO.CELO:
//       return Celo;
//     case CURRENCIES.REAL.FRANK:
//       return Frank;
//     default:
//       return Bitcoin;
//   }
// };

// export const getCurrenceByCoinbaseSymbols = (currency) => {
//   switch (currency) {
//     case CURRENCIES.COINBASE_TEST_SYMBOLS.BITCOIN:
//       return 'Bitcoin';
//     case CURRENCIES.COINBASE_TEST_SYMBOLS.ETHEREUM:
//       return 'Ethereum';
//     default:
//       return null;
//   }
// };

// export const getCurrencySymbol = (currency) => {
//   switch (currency) {
//     case CURRENCIES.CRYPTO.BITCOIN:
//       return {
//         sign: '₿',
//         codeISO: 'BTC',
//       };
//     case CURRENCIES.CRYPTO.ETHEREUM:
//       return {
//         sign: 'Ξ',
//         codeISO: 'ETH',
//       };
//     case CURRENCIES.CRYPTO.CELO:
//       return {
//         sign: 'C',
//         codeISO: 'CELO',
//       };
//     case CURRENCIES.REAL.FRANK:
//       return {
//         sign: '₣',
//         codeISO: '₣',
//       };
//     case CURRENCIES.REAL.DOLLAR:
//       return {
//         sign: '$',
//         codeISO: '$',
//       };
//     default:
//       return {
//         sign: '₣',
//         codeISO: '₣',
//       };
//   }
// };

// export const processCryptoFiatMoney = (text) => {
//   const processedText = text
//     .toString()
//     .replace(/[^0-9.]/g, '')
//     .replace(/(\..*)\./g, '$1')
//     .replace(/^0+(\d)/gm, '$1');
//   const numbersArr = processedText.split('.');
//   numbersArr[0] = numbersArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   return text.toString().startsWith('-')
//     ? `-${numbersArr.join('.')}`
//     : numbersArr.join('.');
// };

// export const getMantissa = (number) => {
//   const mantissa = number.toExponential(15);

//   const numbersArr = mantissa.split('e');

//   return Big(numbersArr[0]).mul(Big(10).pow(Number(numbersArr[1])));
// };

// export const getRawNumberString = (string) => {
//   return string.replace(/,/g, '');
// };
