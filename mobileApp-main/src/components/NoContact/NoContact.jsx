import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';

import styles from './NoContact.styles';

function NoContact({ title, subTitle }) {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </SafeAreaView>
  );
}

NoContact.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

NoContact.defaultProps = {
  title: '',
  subTitle: '',
};

export default NoContact;
