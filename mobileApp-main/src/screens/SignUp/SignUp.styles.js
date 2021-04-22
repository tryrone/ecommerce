import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';
import fonts from 'themes/fonts';
import styles from 'themes/commonStyles';

export default StyleSheet.create({
  screenContent: {
    ...styles.authScreenStyle,
    alignItems: 'center',
  },
  link: {
    color: colors.linkFont,
  },
  mainContent: {
    flex: 1,
    width: '100%',
  },
  footer: {
    marginTop: 'auto',
    width: '100%',
    marginBottom: normalizeSpace(33),
  },
  phoneContainer: {
    marginTop: normalizeSpace(50),
  },
  footerText: {
    letterSpacing: fonts.letterSpacing.regular,
    marginBottom: normalizeSpace(15),
    textAlign: 'center',
  },
});
