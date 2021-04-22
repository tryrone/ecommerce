import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dailyAmount: {
    fontWeight: fonts.weight.medium,
  },
  subtitle: {
    color: colors.gray,
    fontSize: fonts.size.extraSmall,
    lineHeight: fonts.lineHeight.extraSmall,
  },
});
