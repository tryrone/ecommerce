import RNSInfo from 'react-native-sensitive-info';

const KEYCHAIN_NAME = 'DUNIAPAY_KEY';

export const setPassword = (password) => {
  return RNSInfo.setItem(KEYCHAIN_NAME, password, {});
};

export const getPassword = () => {
  return RNSInfo.getItem(KEYCHAIN_NAME, {});
};
