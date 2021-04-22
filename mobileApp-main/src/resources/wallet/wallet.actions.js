import { MOBILE_MONEY_FLOW } from 'helpers/constants';
import * as api from './wallet.api';
import {
  SELECT_PHONE_NUMBER,
  SET_PHONE_NUMBERS,
  REMOVE_PHONE_NUMBER,
  ADD_PHONE_NUMBER,
} from './wallet.constants';

export const setPhoneNumbers = () => async (dispatch) => {
  const phoneNumbers = await api.getSavedPhoneNumbers();

  dispatch({
    type: SET_PHONE_NUMBERS,
    payload: phoneNumbers,
  });

  return phoneNumbers;
};

export const selectPhoneNumber = (_id) => (dispatch) => {
  dispatch({ type: SELECT_PHONE_NUMBER, payload: _id });
};

export const addPhoneNumber = (phone, phoneFlow) => async (dispatch) => {
  let newPhone = phone;
  if (phoneFlow !== MOBILE_MONEY_FLOW.SEND) {
    newPhone = await api.addNewSavedPhoneNumber(phone);
  }

  dispatch({ type: ADD_PHONE_NUMBER, payload: newPhone });
};

export const removePhoneNumber = (_id) => async (dispatch) => {
  await api.removeSavedPhoneNumber(_id);
  dispatch({
    type: REMOVE_PHONE_NUMBER,
    payload: _id,
  });
};
