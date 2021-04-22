import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import DashIndicator from '../DashIndicator';

import styles from './ProgressIndicator.styles';

function ProgressIndicator({ currentStep, stepCount }) {
  return (
    <View style={styles.progress}>
      {[...Array(stepCount).keys()].map((currentValue, index) => (
        <DashIndicator
          isActive={index + 1 === currentStep}
          key={currentValue}
        />
      ))
      }
    </View>
  );
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number,
  stepCount: PropTypes.number,
};

ProgressIndicator.defaultProps = {
  currentStep: 1,
  stepCount: 1,
};

export default ProgressIndicator;
