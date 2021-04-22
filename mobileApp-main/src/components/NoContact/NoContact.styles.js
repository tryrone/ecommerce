import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: fonts.size.large,
    fontWeight: fonts.weight.bold,
    lineHeight: fonts.lineHeight.medium,
    letterSpacing: fonts.letterSpacing.regular,
    marginTop: 70,
    color: colors.black,
  },
  subTitle: {
    fontSize: fonts.size.small,
    lineHeight: fonts.lineHeight.regular,
    marginTop: 9,
    color: colors.gray,
    letterSpacing: fonts.letterSpacing.regular,
    textAlign: 'center',
  },
});
