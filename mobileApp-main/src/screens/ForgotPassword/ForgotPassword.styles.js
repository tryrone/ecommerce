import { StyleSheet } from 'react-native';

import styles from 'themes/commonStyles';
import { normalizeSpace } from 'helpers/utils.helper';

export default StyleSheet.create({
  screen: {
    ...styles.authScreenStyle,
  },
  inputWrapper: {
    marginTop: normalizeSpace(31),
  },
  buttonContinueWrapper: {
    marginBottom: normalizeSpace(33),
    marginTop: 'auto',
  },
});
