import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authScreenBackground,
  },
  pinCodeWrapper: {
    marginTop: normalizeSpace(60),
  },
  link: {
    color: colors.theme,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: normalizeSpace(60),
  },
  forgotText: {
    marginRight: 5,
  },
  text: {
    textAlign: 'center',
    fontWeight: fonts.weight.bold,
    color: colors.theme,
    marginLeft: 8,
  },
  warningText: {
    marginTop: normalizeSpace(20),
    textAlign: 'center',
    marginHorizontal: normalizeSpace(40),
    color: colors.red,
  },
  touchIdLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: normalizeSpace(71),
  },
});
