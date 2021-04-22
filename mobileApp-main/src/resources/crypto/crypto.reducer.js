import { SET_CRYPTO_INFO, SET_CRYPTO_DYNAMICS } from './crypto.constants';

const initialState = {
  Bitcoin: {
    sellCryptoPrice: 0,
    dynamic: 0,
    cryptoBalance: 0,
    convertedUSDBalance: 0,
  },
  Ethereum: {
    sellCryptoPrice: 0,
    dynamic: 0,
    cryptoBalance: 0,
    convertedUSDBalance: 0,
  },
  Celo: {
    sellCryptoPrice: 0,
    dynamic: 0,
    cryptoBalance: 0,
    convertedUSDBalance: 0,
  },
  cryptoHistory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYPTO_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CRYPTO_DYNAMICS:
      return {
        ...state,
        cryptoHistory: action.data,
      };
    default:
      return state;
  }
};
