import { apiClient } from 'helpers/api';

export const signUp = (userData) => apiClient.post('accounts/signup', userData);

export const signIn = ({ email, password }) =>
  apiClient.post('accounts/signin', { email, password });

export const getCurrentUser = () => apiClient.get('users/current');

export const sendCode = (phoneNumber) => {
  return apiClient.post('accounts/send/code', { phoneNumber });
};

export const verifyCode = (data) => {
  return apiClient.post('accounts/verify/code', data);
};

export const forgotPassword = (phoneNumber) => {
  return apiClient.post('/accounts/forgot-password', { phoneNumber });
};

export const getFilteredDuniapayUsers = (filter) => {
  return apiClient.get('/users', filter);
};

export const resetPassword = (data) => {
  return apiClient.patch('/accounts/reset-password', data);
};

export const createNewPassword = (data) => {
  return apiClient.patch('/users/current/reset-password', data);
};

export const signUpFacebook = (tokens) => {
  return apiClient.post('accounts/signup/facebook', tokens);
};

export const signUpGoogle = (tokens) => {
  return apiClient.post('accounts/signup/google', tokens);
};

export const signUpApple = (tokens) => {
  return apiClient.post('accounts/signup/apple', tokens);
};

export const signInFacebook = (facebookAccessToken) => {
  return apiClient.post('accounts/signin/facebook', facebookAccessToken);
};

export const signInGoogle = (googleAccessToken) => {
  return apiClient.post('accounts/signin/google', { googleAccessToken });
};

export const signInApple = (appleIdentityToken) => {
  return apiClient.post('accounts/signin/apple', { appleIdentityToken });
};

export const getBalance = async () => {
  const { availableBalance } = await apiClient.get('users/current/balance');
  return availableBalance;
};

export const getCryptoInfo = async (crypto) => {
  return apiClient.get(`users/current/crypto`, {
    crypto,
  });
};

export const getUserData = async (userData) => {
  return apiClient.get(`/users/${userData.userId}`);
};

export const getLatestTransactions = async (skip = 0) => {
  return apiClient.get('/users/current/transactions', { skip });
};

export const getCryptoLatestTransactions = async (skip = 0, crypto) => {
  return apiClient.get('/users/current/transactions', {
    skip,
    crypto,
  });
};

export const getDailyTotal = async (start, end, crypto) => {
  const { total_amount: totalAmount } = await apiClient.get(
    '/users/current/transactions/totals',
    {
      created__gt: start,
      created__lt: end,
      crypto,
    },
  );

  return totalAmount;
};

export const startVerification = (data) => {
  return apiClient.post('/users/current/verify', data);
};

export const getDebitCards = () => apiClient.get('users/current/debitCards');

export const removeDebitCard = (cardId) =>
  apiClient.delete(`users/current/debitCards/${cardId}`);

export const updatePhoneNumber = (phoneNumber) =>
  apiClient.patch('users/current/phonenumber', { phoneNumber });

export const getCrossContacts = (listPhoneContacts) => {
  return apiClient.post(`users/current/crossContacts`, listPhoneContacts);
};

export const getNotDuniapayUsers = (listPhoneContacts) => {
  return apiClient.post(`users/current/notDuniapayUsers`, listPhoneContacts);
};

export const sendInvite = ({ smsBody, phoneNumber }) => {
  return apiClient.post(`users/current/send-invite`, {
    recipientPhone: phoneNumber,
    smsBody,
  });
};

export const setPushNotificationsToken = (token) => {
  return apiClient.post('users/current/pushNotificationsToken', { token });
};

export const removePushNotificationsToken = (token) => {
  return apiClient.delete(`users/current/pushNotificationsToken/${token}`);
};

export const setShowPushNotifications = (show) => {
  return apiClient.post('users/current/showPushNotifications', { show });
};

export const hideBalance = (isHiddenBalance) => {
  return apiClient.patch('users/current/hideBalance', { isHiddenBalance });
};

export const setAvatar = (formData) => {
  return apiClient.patch('users/current/setAvatar', formData);
};
