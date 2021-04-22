import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  cardContent: {
    marginLeft: 19,
    width: '60%',
  },
  cardInfo: {
    flexDirection: 'row',
  },
  cardTitle: {
    height: 20,
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
