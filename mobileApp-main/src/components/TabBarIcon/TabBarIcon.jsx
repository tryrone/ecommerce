import React from 'react';
import PropTypes from 'prop-types';

import colors from 'themes/colors';

function TabBarIcon({ icon: Icon, focused }) {
  return focused ? <Icon fill={colors.white} opacity={1} /> : <Icon />;
}

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
};

TabBarIcon.defaultProps = {
  focused: false,
};

export default TabBarIcon;
