import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from 'components/Text';

import styles from './Badge.styles';

function Badge({ title, color }) {
  return (
    <View>
      <View style={styles.badgeWrapper(color)} />
      <Text style={styles.badgeTitle(color)}>{title}</Text>
    </View>
  );
}

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Badge;
