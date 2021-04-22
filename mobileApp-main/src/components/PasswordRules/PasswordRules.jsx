import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import Text from 'components/Text';

import { PASSWORD } from 'helpers/constants';

import styles from './PasswordRules.styles';

function PasswordRules({ style }) {
  return (
    <View style={style}>
      <Text style={styles.passwordRule}>
        1. At least {PASSWORD.length} characters long
      </Text>
      <Text style={styles.passwordRule}>
        2. Include at least one special characters (@ $ & %)
      </Text>
      <Text style={styles.passwordRule}>
        3. Include at least one uppercase letter
      </Text>
      <Text style={styles.passwordRule}>4. Include at least one digit</Text>
    </View>
  );
}

PasswordRules.propTypes = {
  style: ViewPropTypes.style,
};

PasswordRules.defaultProps = {
  style: null,
};

export default PasswordRules;
