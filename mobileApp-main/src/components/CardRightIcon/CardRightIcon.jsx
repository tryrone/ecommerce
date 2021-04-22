import React from 'react';
import PropTypes from 'prop-types';

import Text from 'components/Text';

import styles from './CardRightIcon.styles';

function CardRightIcon({ title }) {
  return <Text style={styles.button}>{title}</Text>;
}

CardRightIcon.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardRightIcon;
