import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './DashIndicator.styles';

function DashIndicator({ isActive }) {
  return (
    <View style={isActive ? styles.stepActive : [styles.stepActive, styles.stepPassive]} />
  );
}

DashIndicator.propTypes = {
  isActive: PropTypes.bool,
};

DashIndicator.defaultProps = {
  isActive: true,
};

export default DashIndicator;
