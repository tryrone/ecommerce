import { apiClient } from 'helpers/api';

const phoneNumbersReq = 'users/current/phonenumbers';
export const getSavedPhoneNumbers = () => apiClient.get(phoneNumbersReq);

export const addNewSavedPhoneNumber = (phone) =>
  apiClient.post(phoneNumbersReq, phone);

export const removeSavedPhoneNumber = (phoneId) =>
  apiClient.delete(`${phoneNumbersReq}/${phoneId}`);
