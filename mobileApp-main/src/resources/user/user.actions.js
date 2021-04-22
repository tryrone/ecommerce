import { setToken, removeToken, setItem, getToken } from 'helpers/storage';
import { STORAGE } from 'helpers/constants';
import { setPassword } from 'helpers/keychain.helper';
import firebaseMessaging from 'helpers/firebase.helper';

import {
  USER_AUTHENTICATED,
  USER_CURRENT,
  USER_LOGGED_OUT,
  HIDE_ONBOARDING,
  SET_PIN_CODE,
  USER_SIGNED_UP,
  HIDE_BALANCE,
  SET_AVATAR_URL,
  USER_SIGNED_IN,
  USER_UPDATED,
  SET_PUSH_NOTIFICATIONS_TOKEN,
  REMOVE_PUSH_NOTIFICATIONS_TOKEN,
  SET_SHOW_PUSH_NOTIFICATIONS,
  SET_AVAILABLE_BALANCE,
  SET_PIN_ENTER_ATTEMPTS,
} from './user.constants';

import * as api from './user.api';

const setAccessToken = async (accessToken) => {
  if (!accessToken) return;

  await setToken(accessToken);
};

export const setUserAuthenticated = () => ({ type: USER_AUTHENTICATED });

export const resetPassword = (password, verificationToken) => async (
  dispatch,
) => {
  const { accessToken, ...userData } = await api.resetPassword({
    password,
    verificationToken,
  });

  await setAccessToken(accessToken);

  dispatch({ type: USER_SIGNED_UP, payload: userData });

  return userData;
};

export const updatePhoneNumber = (phoneNumber) => async (dispatch) => {
  const userData = await api.updatePhoneNumber(phoneNumber);
  dispatch({ type: USER_UPDATED, payload: userData });
};

export const signUp = (user) => async (dispatch) => {
  const userData = await api.signUp(user);

  if (userData.accessToken) {
    await setToken(userData.accessToken);
  }

  dispatch({ type: USER_SIGNED_UP, payload: userData });

  return userData;
};

export const signIn = ({ email, password }) => async (dispatch) => {
  const { accessToken, ...userData } = await api.signIn({ email, password });

  dispatch({ type: USER_SIGNED_IN, payload: userData });
  return setAccessToken(accessToken);
};

export const getCurrentUser = () => async (dispatch) => {
  const userData = await api.getCurrentUser();

  dispatch({ type: USER_CURRENT, userData });

  return userData;
};

export const removePushNotificationsToken = () => async (dispatch) => {
  const firebaseToken = await firebaseMessaging.getToken();
  await api.removePushNotificationsToken(firebaseToken);
  await dispatch({
    type: REMOVE_PUSH_NOTIFICATIONS_TOKEN,
    token: firebaseToken,
  });
};

export const logOut = () => async (dispatch) => {
  await removeToken();
  await setItem(STORAGE.HIDE_ON_BOARDING, false);
  await setPassword('');
  dispatch({ type: USER_LOGGED_OUT });
};

export const signInFacebook = (facebookAccessToken) => async (dispatch) => {
  const { accessToken, ...userData } = await api.signInFacebook(
    facebookAccessToken,
  );

  dispatch({ type: USER_SIGNED_IN, payload: userData });

  return setAccessToken(accessToken);
};

export const signInGoogle = (googleAccessToken) => async (dispatch) => {
  const { accessToken, ...userData } = await api.signInGoogle(
    googleAccessToken,
  );

  dispatch({ type: USER_SIGNED_IN, payload: userData });

  return setAccessToken(accessToken);
};

export const signInApple = (appleIdentityToken) => async (dispatch) => {
  const { accessToken, ...userData } = await api.signInApple(
    appleIdentityToken,
  );

  dispatch({ type: USER_SIGNED_IN, payload: userData });

  return setAccessToken(accessToken);
};

export const hideOnboarding = (isHidden) => (dispatch) => {
  setItem(STORAGE.HIDE_ON_BOARDING, isHidden);
  dispatch({
    type: HIDE_ONBOARDING,
    payload: { isOnboardingHidden: isHidden },
  });
};

export const setPinCode = (pinCode) => ({
  type: SET_PIN_CODE,
  payload: { pinCode },
});

export const setPinCodeAttempts = (pinCodeAttempts) => ({
  type: SET_PIN_ENTER_ATTEMPTS,
  payload: { pinCodeAttempts },
});

export const hideBalance = (isHidden) => async (dispatch) => {
  await api.hideBalance(isHidden);
  dispatch({ type: HIDE_BALANCE, isHidden });
};

export const setAvatar = (formData) => async (dispatch) => {
  const { avatarUrl } = await api.setAvatar(formData);
  dispatch({ type: SET_AVATAR_URL, avatarUrl });
};

export const enterPinCode = (pinCode) => async (dispatch, getState) => {
  const state = getState();
  const token = await getToken();
  const storedPinCode = state.pinCode;

  if (pinCode === storedPinCode && token) {
    const userData = await dispatch(getCurrentUser());
    const isHidden = userData.isHiddenBalance;
    await dispatch({ type: HIDE_BALANCE, isHidden });
    dispatch(setUserAuthenticated());
  }
};

export const setPushNotificationsToken = (firebaseToken) => async (
  dispatch,
) => {
  const { token } = await api.setPushNotificationsToken(firebaseToken);
  dispatch({ type: SET_PUSH_NOTIFICATIONS_TOKEN, token });
};

export const setShowPushNotifications = (showPushNotifications) => async (
  dispatch,
) => {
  const { show } = await api.setShowPushNotifications(showPushNotifications);
  dispatch({ type: SET_SHOW_PUSH_NOTIFICATIONS, show });
};

export const biometricAuth = () => async (dispatch) => {
  await dispatch(getCurrentUser());
  dispatch(setUserAuthenticated());
};

export const getBalance = () => async (dispatch) => {
  const availableBalance = await api.getBalance();
  dispatch({ type: SET_AVAILABLE_BALANCE, availableBalance });
  return availableBalance;
};
