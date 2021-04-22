import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';
import Text from 'components/Text';

import { getCurrencyIcon, getCurrencySymbol } from 'helpers/currency.helper';

import styles from './CurrencyCard.styles';

function CurrencyCard({ title, currency, setValue, value }) {
  const Icon = getCurrencyIcon(currency);

  return (
    <View style={styles.card}>
      <Icon style={styles.icon}/>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.wrapperInputMoney}>
          <Text style={styles.currency}>
            {getCurrencySymbol(currency).sign}
          </Text>
          <TextInput
            multiline={false}
            underlineColorAndroid="transparent"
            onChangeText={setValue}
            value={value}
            autoFocus
            style={styles.input}
            keyboardType="default"
          />
        </View>
      </View>
    </View>
  );
}

CurrencyCard.propTypes = {
  title: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CurrencyCard;
