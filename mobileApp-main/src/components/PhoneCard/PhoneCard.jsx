import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { getCorrectOperatorForTransaction } from 'helpers/utils.helper';

import CheckedIcon from 'assets/icons/checkMark.svg';

import styles from './PhoneCard.styles';

function PhoneCard({
  providerName,
  providerLogo: ProviderLogo,
  isChoosed,
  chooseMobileOperator,
}) {
  const handleChooseOperator = useCallback(() => {
    chooseMobileOperator(providerName);
  }, [providerName, chooseMobileOperator]);

  return (
    <TouchableOpacity
      onPress={handleChooseOperator}
      activeOpacity={0.9}
      style={[styles.iconContainer, isChoosed && styles.choosedIconContainer]}
    >
      {isChoosed && (
        <View style={styles.icon}>
          <CheckedIcon />
        </View>
      )}
      <ProviderLogo />
      <Text style={styles.providerName}>{getCorrectOperatorForTransaction(providerName)}</Text>
    </TouchableOpacity>
  );
}

PhoneCard.propTypes = {
  providerName: PropTypes.string.isRequired,
  providerLogo: PropTypes.elementType.isRequired,
  chooseMobileOperator: PropTypes.func.isRequired,
  isChoosed: PropTypes.bool.isRequired,
};

export default PhoneCard;
