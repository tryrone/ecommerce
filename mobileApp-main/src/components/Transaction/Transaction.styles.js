import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
  },
  textContainer: {
    width: '100%',
    marginLeft: 12,
    marginRight: 'auto',
  },
  moneyAmount: {
    color: colors.gray,
    fontSize: fonts.size.regular,
  },
  bigAmount: {
    fontSize: fonts.size.extraSmall,
  },
  receiveMoney: {
    color: colors.inputCorrect,
  },
  iconWrapper: {
    padding: 11,
    borderRadius: 5,
    borderColor: colors.transactionBorder,
    borderWidth: 1,
  },
  title: {
    color: colors.black,
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.regular,
  },
  subtitle: {
    color: colors.gray,
    fontSize: fonts.size.extraSmall,
    lineHeight: fonts.lineHeight.extraSmall,
    marginTop: 6,
  },
});
