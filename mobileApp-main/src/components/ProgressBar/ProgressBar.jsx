import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from 'components/Text';

import styles from './ProgressBar.styles';

function ProgressBar({ currentStep, totalSteps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {`Step ${currentStep} of ${totalSteps}`}
      </Text>
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${currentStep * 100 / totalSteps}%` }]} />
      </View>
    </View>
  );
}

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
