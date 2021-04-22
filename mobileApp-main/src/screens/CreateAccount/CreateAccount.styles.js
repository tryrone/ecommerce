import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import styles from 'themes/commonStyles';
import colors from 'themes/colors';

export default StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.authScreenBackground,
  },
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
  forgotWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalizeSpace(11),
  },
  forgotText: {
    color: colors.inputPlaceholder,
  },
  forgotLink: {
    color: colors.theme,
  },
  passwordInput: {
    marginTop: normalizeSpace(11),
  },
  passwordRulesWrapper: {
    marginTop: normalizeSpace(10),
    marginBottom: normalizeSpace(20),
  },
});
