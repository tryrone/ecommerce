import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';

import styles from './LeftIcon.styles';

function LeftIcon({ icon }) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.initials}>{icon}</Text>
    </View>
  );
}

LeftIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default LeftIcon;
