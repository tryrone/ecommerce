import React, { useMemo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import CardIllustration from 'assets/icons/cardIllustration.svg';

import styles from './HomepageEmpty.styles';

const splitRegex = /\{([^}]+)\}/;

function HomepageEmpty({ children, onLinkPress }) {
  const textArray = useMemo(() => {
    return children.split(splitRegex);
  }, [children]);

  return (
    <View style={styles.container}>
      <CardIllustration />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {textArray[0]}
          <Text onPress={onLinkPress} style={[styles.text, styles.linkText]}>
            {textArray[1]}
          </Text>
          {textArray[2]}
        </Text>
      </View>
    </View>
  );
}

HomepageEmpty.propTypes = {
  children: PropTypes.string,
  onLinkPress: PropTypes.func.isRequired,
};

HomepageEmpty.defaultProps = {
  children: '',
};

export default HomepageEmpty;
