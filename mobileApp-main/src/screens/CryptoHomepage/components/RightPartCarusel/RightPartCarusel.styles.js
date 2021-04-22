import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  titleRightIcon: {
    fontSize: fonts.size.extraSmall,
    color: colors.black,
    lineHeight: fonts.lineHeight.extraSmall,
    alignSelf: 'flex-end',
  },
  dynamicRightIcon: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: colors.dynamicCryptoBackground,
    color: colors.inputCorrect,
    fontSize: fonts.size.extraSmall,
    fontWeight: fonts.weight.medium,
    marginTop: 10,
  },
  negativeDynamic: {
    backgroundColor: colors.notEnoughBalanceBackground,
    color: colors.red,
  },
});
