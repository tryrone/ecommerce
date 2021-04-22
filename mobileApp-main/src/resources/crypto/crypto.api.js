import { apiClient } from 'helpers/api';

export const getCryptoInfo = async () => {
  return apiClient.get('users/current/crypto');
};

export const getCryptoAssetId = async (crypto) => {
  return apiClient.get(`users/current/crypto-id`, {
    crypto,
  });
};

export const exchangeCrypto = (data) => {
  return apiClient.post('transactions/exchange-crypto', data);
};

export const getCryptoFiatBalance = (crypto) => {
  return apiClient.get('users/current/crypto-fiat-balance', {
    crypto,
  });
};

export const sendCrypto = (data) => {
  return apiClient.post('transactions/send-crypto', data);
};

export const getCryptoDynamics = (crypto, option) => {
  return apiClient.get('users/current/crypto-dynamics', { crypto, option });
};
