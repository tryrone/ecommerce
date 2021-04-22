import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from 'components/Text';

import styles from './InfoLabel.styles';

function InfoLabel({ text, type }) {
  return (
    <View
      style={[
        styles.label,
        type === 'success' && styles.labelSuccess,
        type === 'error' && styles.labelError,
      ]}
    >
      <Text
        style={[
          styles.labelText,
          type === 'success' && styles.labelTextSuccess,
          type === 'error' && styles.labelTextError,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

InfoLabel.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
};

InfoLabel.defaultProps = {
  type: 'success',
};

export default InfoLabel;
