import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Text from 'components/Text';

import CheckMarkIcon from 'assets/icons/verifyIdentity.svg';

import styles from './ListItem.styles';

function ListItem({ title }) {
  return (
    <View style={styles.wrapper}>
      <CheckMarkIcon />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ListItem;
