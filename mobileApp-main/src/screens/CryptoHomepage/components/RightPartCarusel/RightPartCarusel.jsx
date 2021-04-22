import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';

import { CURRENCIES, getCurrencySymbol } from 'helpers/currency.helper';

import styles from './RightPartCarusel.styles';

const RightPartCarusel = ({ dynamic, priceForOneCrypto }) => {
  const isPositiveDynamic = Number(dynamic) >= 0;

  return (
    <View>
      <Text style={styles.titleRightIcon}>
        {getCurrencySymbol(CURRENCIES.REAL.DOLLAR).codeISO}
        {priceForOneCrypto}
      </Text>
      <Text
        style={[
          styles.dynamicRightIcon,
          !isPositiveDynamic && styles.negativeDynamic,
        ]}
      >
        {dynamic}%
      </Text>
    </View>
  );
};

RightPartCarusel.propTypes = {
  dynamic: PropTypes.number.isRequired,
  priceForOneCrypto: PropTypes.string.isRequired,
};

export default RightPartCarusel;
