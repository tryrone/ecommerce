import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';

import Text from 'components/Text';

import styles from './RightIcon.styles';

function RightIcon({
  onRightIconClick,
  rightIconStyle,
  rightIconText,
  rightIcon: Icon,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, rightIconStyle]}
      onPress={onRightIconClick}
    >
      <Icon />
      <Text style={styles.text}>{rightIconText}</Text>
    </TouchableOpacity>
  );
}

RightIcon.propTypes = {
  onRightIconClick: PropTypes.func,
  rightIconStyle: ViewPropTypes.style,
  rightIconText: PropTypes.string,
  rightIcon: PropTypes.elementType,
};

RightIcon.defaultProps = {
  onRightIconClick: () => {},
  rightIconStyle: null,
  rightIconText: '',
  rightIcon: null,
};

export default RightIcon;
