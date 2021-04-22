import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import styles from './AuthHeaderLayout.styles';

function AuthHeaderLayout({ style, children }) {
  return (
    <View style={[styles.wrapper, style]}>
      {children}
    </View>
  );
}

AuthHeaderLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

AuthHeaderLayout.defaultProps = {
  style: null,
};

export default AuthHeaderLayout;
