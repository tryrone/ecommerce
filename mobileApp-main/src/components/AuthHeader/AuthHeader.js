import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import images from 'themes/images';

import styles from './AuthHeader.styles';

function AuthHeader({
  withLogo, title, subtitle,
}) {
  return (
    <View style={styles.container}>
      {withLogo && (
        <Image source={images.duniaLogo} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

AuthHeader.propTypes = {
  withLogo: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

AuthHeader.defaultProps = {
  withLogo: false,
  subtitle: '',
};

export default AuthHeader;
