import React from 'react';
import { View, ViewPropTypes, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import BackIcon from 'assets/icons/backIcon.svg';

import styles from './HeaderWithBackArrow.styles';

function HeaderWithBackArrow({
  children,
  style,
  backIconStyle,
  onBackNavigation,
}) {
  return (
    <View style={[style, styles.header]}>
      <TouchableOpacity
        style={[styles.wrapperArrow, backIconStyle]}
        onPress={onBackNavigation}
      >
        <BackIcon />
      </TouchableOpacity>
      {children}
    </View>
  );
}

HeaderWithBackArrow.propTypes = {
  onBackNavigation: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  backIconStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
};

HeaderWithBackArrow.defaultProps = {
  children: null,
  style: null,
  backIconStyle: null,
};

export default HeaderWithBackArrow;
