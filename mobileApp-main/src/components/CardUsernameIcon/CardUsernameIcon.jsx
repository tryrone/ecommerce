import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';

import { getInitials } from 'helpers/utils.helper';

import styles from './CardUsernameIcon.styles';

function CardUsernameIcon({ username }) {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.initials}>{getInitials(username)}</Text>
    </View>
  );
}

CardUsernameIcon.propTypes = {
  username: PropTypes.string,
};

CardUsernameIcon.defaultProps = {
  username: '',
};

export default CardUsernameIcon;
