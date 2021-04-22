import React from 'react';
import { View, Image, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { getInitials } from 'helpers/utils.helper';

import Text from 'components/Text';

import styles from './Avatar.styles';

function Avatar({ username, avatarUrl, containerStyle, avatarStyle }) {
  return (
    <View style={[styles.avatarContainer, containerStyle]}>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={[styles.avatar, avatarStyle]}
        />
      ) : (
        <Text style={styles.initials}>{getInitials(username)}</Text>
      )}
    </View>
  );
}

Avatar.propTypes = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  avatarStyle: ViewPropTypes.style,
};

Avatar.defaultProps = {
  username: '',
  avatarUrl: '',
  containerStyle: null,
  avatarStyle: null,
};

export default Avatar;
