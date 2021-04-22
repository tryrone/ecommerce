import Visa from 'assets/icons/visa.svg';
import Mastercard from 'assets/icons/mastercard.svg';
import Card from 'assets/icons/defaultCard.svg';

import { CARD_BRANDS } from 'helpers/constants';

export const getCardBrandIcon = (name) => {
  switch (name) {
    case CARD_BRANDS.VISA:
      return Visa;
    case CARD_BRANDS.MASTERCARD:
      return Mastercard;
    default:
      return Card;
  }
};
