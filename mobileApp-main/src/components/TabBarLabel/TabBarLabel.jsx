import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';

import styles from './TabBarLabel.styles';

function TabBarLabel({ text, focused }) {
  return (
    <Text
      style={[styles.text, focused ? styles.activeText : styles.inActiveText]}
    >
      {text}
    </Text>
  );
}

TabBarLabel.propTypes = {
  focused: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

TabBarLabel.defaultProps = {
  focused: false,
};

export default TabBarLabel;
