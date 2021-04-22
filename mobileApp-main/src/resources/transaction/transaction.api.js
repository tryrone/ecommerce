import { apiClient } from 'helpers/api';

export const deposit = (amount) => {
  return apiClient.post('/transactions/credit', {
    amount,
  });
};

export const transfer = ({ amount, recipient }) => {
  return apiClient.post('/transactions/transfer', {
    amount,
    recipient,
  });
};

export const mobileDeposit = (data) => {
  return apiClient.post('/transactions/mobile-deposit', data);
};

export const buyAirtime = (data) => {
  return apiClient.post('/transactions/airtime', data);
};

export const withdrawalMobileMoney = (data) => {
  return apiClient.post('/transactions/withdrawal', data);
};
