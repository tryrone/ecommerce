import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './Status.styles';

function Status({ status }) {
  if (status === 'Failed')
    return <Text style={[styles.status, styles.failedStatus]}>{status}</Text>;
  if (status === 'Pending') return <Text style={styles.status}>{status}</Text>;
  return null;
}

Status.propTypes = {
  status: PropTypes.oneOf(['Pending', 'Failed', 'Complete', 'Initiating']),
};

Status.defaultProps = {
  status: null,
};

export default Status;
