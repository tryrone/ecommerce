import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';
import fonts from 'themes/fonts';
import styles from 'themes/commonStyles';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.authScreenBackground,
  },
  screen: {
    ...styles.authScreenStyle,
  },
  wrapperInput: {
    marginTop: normalizeSpace(40),
  },
  inputOutOfFocused: {
    borderColor: colors.inputStandardBorder,
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
  textError: {
    fontSize: fonts.size.small,
    paddingTop: normalizeSpace(12),
    color: colors.inputErrorText,
  },
});
