import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import ExchangeButton from 'assets/icons/exchangeMoney.svg';

import CurrencyCard from '../CurrencyCard';

import styles from './ConvertCards.styles';

function ConvertCard({ cards, setCards, handleChangeMoney }) {
  const handlePress = useCallback(
    () => setCards((state) => ({ from: state.to, to: state.from })),
    [setCards],
  );

  const handleChangeFromAmount = useCallback(
    (e) => handleChangeMoney(e, cards.from.currency),
    [handleChangeMoney, cards.from.currency],
  );

  const handleChangeToAmount = useCallback(
    (e) => handleChangeMoney(e, cards.to.currency),
    [handleChangeMoney, cards.to.currency],
  );

  return (
    <>
      <CurrencyCard
        title="You spend"
        currency={cards.from.currency}
        setValue={handleChangeFromAmount}
        value={cards.from.value}
      />
      <CurrencyCard
        title="You get"
        currency={cards.to.currency}
        setValue={handleChangeToAmount}
        value={cards.to.value}
      />
      <TouchableOpacity
        onPress={handlePress}
        style={styles.exchangeButtonWrapper}
      >
        <ExchangeButton />
      </TouchableOpacity>
    </>
  );
}

ConvertCard.propTypes = {
  cards: PropTypes.shape({
    from: PropTypes.shape({
      currency: PropTypes.string,
      value: PropTypes.string,
    }),
    to: PropTypes.shape({
      currency: PropTypes.string,
      value: PropTypes.string,
    }),
  }).isRequired,
  setCards: PropTypes.func.isRequired,
  handleChangeMoney: PropTypes.func.isRequired,
};

export default ConvertCard;
