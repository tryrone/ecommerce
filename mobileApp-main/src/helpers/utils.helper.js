import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';

import colors from 'themes/colors';

import { PHONE_OPERATORS, MOBILE_MONEY_FLOW } from './constants';
import { processCryptoFiatMoney, getCurrencySymbol } from './currency.helper';

const { height, width } = Dimensions.get('window');

const breakpoints = {
  smallPhoneWidth: 320,
  smallPhoneHeight: 600,
  mediumPhoneWidth: 414,
  bigPhoneWidth: 480,
};

export const sizeQrCode = width - 68;

const isSmallScreen =
  width <= breakpoints.smallPhoneWidth ||
  height <= breakpoints.smallPhoneHeight;
const isNormalScreen =
  width > breakpoints.smallPhoneWidth && width < breakpoints.mediumPhoneWidth;
const isBigScreen = width >= breakpoints.mediumPhoneWidth;

export const normalizeSpace = (basicSpace) => {
  if (isSmallScreen) {
    return basicSpace - 6;
  }
  if (isNormalScreen) {
    return basicSpace;
  }
  if (isBigScreen) {
    return basicSpace + 1;
  }
  return basicSpace;
};

export const normalizeFontSize = (basicFontSize) => {
  if (isSmallScreen) {
    return basicFontSize - 2;
  }
  if (isNormalScreen) {
    return basicFontSize;
  }
  if (isBigScreen) {
    return basicFontSize + 1;
  }

  return basicFontSize;
};

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const processMoney = (text) => {
  const onlyNumbers = text.replace(/[^\d]/g, '');
  const withoutLeadZeroes = onlyNumbers.replace(/^0+(?=\d)/, '');
  const max6numbers = withoutLeadZeroes.slice(0, 6);
  return max6numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getInitials = (username) => {
  if (!username) return '';
  const withoutUnnecessarySpaces = username.trim().replace(/\s{2,}/g, ' ');
  if (!username || !withoutUnnecessarySpaces) return '';
  const nameArray = withoutUnnecessarySpaces.split(' ');
  if (nameArray.length > 1) {
    return `${nameArray[0][0].toUpperCase()}${nameArray[1][0].toUpperCase()}`;
  }

  return withoutUnnecessarySpaces[0].toUpperCase();
};

export const groupTransactionsList = (transactions) => {
  const groupedTransactions = transactions.reduce((result, item) => {
    const date = new Date(item.created);

    const transactionDay = date.toLocaleDateString('en');

    const transactionsData = result[transactionDay] || [];

    return {
      ...result,
      [transactionDay]: [...transactionsData, item],
    };
  }, {});

  return Object.entries(groupedTransactions);
};

export const formatTransactionAmount = (amount, crypto) => {
  if (amount === 0 || amount === '0') {
    return crypto ? `${getCurrencySymbol(crypto).sign} 0` : '₣ 0';
  }
  if (!crypto) {
    const sign = amount > 0 ? '+' : '-';

    const absValue = Math.abs(amount).toString();

    return `${sign} ₣ ${processMoney(absValue)}`;
  }

  const sign = amount > 0 ? '+' : '-';
  const processedAmount = processCryptoFiatMoney(amount);
  const result =
    processedAmount > 0 ? processedAmount : processedAmount.toString().slice(1);
  return `${sign} ${getCurrencySymbol(crypto).sign} ${result}`;
};

export const getListPhoneContacts = (contacts) => {
  return contacts
    .filter(({ phoneNumbers }) => Boolean(phoneNumbers[0]))
    .map(({ givenName, phoneNumbers }) => {
      return { givenName, phoneNumber: phoneNumbers[0].number };
    });
};

export const getContactsFromPhoneBook = async () => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    );
  }
  const rawListContacts = await Contacts.getAllWithoutPhotos();
  return getListPhoneContacts(rawListContacts);
};

export const isVerificationNeeded = (status) => {
  if (status === 'pending' || status === 'verified') {
    return false;
  }

  return true;
};

export const getVerificationBadgeColor = (status) => {
  switch (status) {
    case 'incomplete':
      return colors.incompleteLabel;
    case 'pending':
      return colors.pendingLabel;
    case 'declined':
      return colors.declinedLabel;
    case 'verified':
      return colors.verifiedLabel;
    default:
      return colors.incompleteLabel;
  }
};

export const getKeyboardVerticalOffset = () => {
  if (Platform.OS === 'android') {
    return height < 700 ? 0 : 30;
  }
  return 30;
};

export const getCorrectOperatorForTransaction = (phoneOperator) => {
  if (phoneOperator === PHONE_OPERATORS.MOOV_AFRICA)
    return PHONE_OPERATORS.MOOV;
  return phoneOperator;
};

export const getCorrectOperatorCurrentFlow = (phoneOperator, phoneflow) => {
  if (
    phoneflow === MOBILE_MONEY_FLOW.AIRTIME &&
    phoneOperator === PHONE_OPERATORS.MOOV
  ) {
    return PHONE_OPERATORS.MOOV_AFRICA;
  }
  if (
    phoneflow !== MOBILE_MONEY_FLOW.AIRTIME &&
    phoneOperator === PHONE_OPERATORS.MOOV_AFRICA
  ) {
    return PHONE_OPERATORS.MOOV;
  }

  return phoneOperator;
};
