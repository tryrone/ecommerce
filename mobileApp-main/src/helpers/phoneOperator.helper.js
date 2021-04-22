import Orange from 'assets/icons/orangeProvider.svg';
import Moov from 'assets/icons/moovMoneyProvider.svg';
import Telecel from 'assets/icons/telecelProvider.svg';
import MoovAfrica from 'assets/icons/moovAfricaProvider.svg';

import { PHONE_OPERATORS } from 'helpers/constants';

export const getPhoneOperatorIcon = (name) => {
  switch (name) {
    case PHONE_OPERATORS.ORANGE:
      return Orange;
    case PHONE_OPERATORS.MOOV:
      return Moov;
    case PHONE_OPERATORS.TELECEL:
      return Telecel;
    case PHONE_OPERATORS.MOOV_AFRICA:
      return MoovAfrica;
    default:
      return Orange;
  }
};

export const getAirtimeMinimumAmount = (name) => {
  switch (name) {
    case PHONE_OPERATORS.ORANGE:
      return 50;
    case PHONE_OPERATORS.MOOV_AFRICA:
      return 25;
    case PHONE_OPERATORS.TELECEL:
      return 100;
    default:
      return 0;
  }
};

export const getWithdrawalMinimumAmount = (name) => {
  switch (name) {
    case PHONE_OPERATORS.ORANGE:
      return 5;
    case PHONE_OPERATORS.MOOV:
      return 100;
    default:
      return 0;
  }
};
