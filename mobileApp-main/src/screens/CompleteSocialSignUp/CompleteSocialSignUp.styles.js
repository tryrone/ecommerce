import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import styles from 'themes/commonStyles';
import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    ...styles.authScreenStyle,
  },
  container: {
    flexGrow: 1,
    backgroundColor: colors.authScreenBackground,
  },
  authHeaderLayout: {
    paddingTop: '15%',
  },
  wrapperInput: {
    marginTop: normalizeSpace(40),
  },
  wrapperButton: {
    marginTop: 'auto',
    marginBottom: normalizeSpace(33),
  },
  passwordInput: {
    marginTop: normalizeSpace(11),
  },
});
