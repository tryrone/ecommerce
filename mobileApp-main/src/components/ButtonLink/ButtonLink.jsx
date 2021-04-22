import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import Text from 'components/Text';

import styles from './ButtonLink.styles';

function ButtonLink({
  onPress,
  title,
  textStyle,
  buttonStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.link,
        buttonStyle,
      ]}
    >
      {title && (
        <Text
          style={[
            styles.title,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

ButtonLink.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  textStyle: Text.propTypes.style,
  buttonStyle: Text.propTypes.style,
};

ButtonLink.defaultProps = {
  title: null,
  textStyle: null,
  buttonStyle: null,
};

export default ButtonLink;
