import * as api from './crypto.api';

import { SET_CRYPTO_INFO, SET_CRYPTO_DYNAMICS } from './crypto.constants';

export const getCryptoInfo = () => async (dispatch) => {
  const userData = await api.getCryptoInfo();

  dispatch({ type: SET_CRYPTO_INFO, payload: userData });
};

export const getCryptoDynamics = (crypto, option) => async (dispatch) => {
  const { data } = await api.getCryptoDynamics(crypto, option);

  dispatch({ type: SET_CRYPTO_DYNAMICS, data });
};
