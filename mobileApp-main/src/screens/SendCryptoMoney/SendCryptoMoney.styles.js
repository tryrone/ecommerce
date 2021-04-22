import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  cardContent: {
    marginLeft: 19,
  },
  cardTitle: {
    color: colors.black,
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.medium,
    lineHeight: fonts.lineHeight.regular,
  },
  cardSubTitle: {
    marginTop: 9,
    color: colors.gray,
    fontSize: fonts.size.extraSmall,
    lineHeight: fonts.lineHeight.small,
  },
  successScreen: {
    backgroundColor: colors.mainScreenBackground,
  },
  amountMoney: {
    fontWeight: fonts.weight.bold,
  },
});
