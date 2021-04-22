import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { getCurrencyIcon } from 'helpers/currency.helper';

import Text from 'components/Text';
import RightPartCarusel from '../RightPartCarusel';

import styles from './CryptoCard.styles';

function CryptoCard({ item: { title, subTitle, dynamic, priceForOneCrypto } }) {
  const CryptoIcon = getCurrencyIcon(title);

  return (
    <View style={styles.card}>
      <CryptoIcon />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.rightCardPart}>
        <RightPartCarusel
          dynamic={dynamic}
          priceForOneCrypto={priceForOneCrypto}
        />
      </View>
    </View>
  );
}

CryptoCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    dynamic: PropTypes.number.isRequired,
    priceForOneCrypto: PropTypes.string.isRequired,
  }).isRequired,
};

export default CryptoCard;
