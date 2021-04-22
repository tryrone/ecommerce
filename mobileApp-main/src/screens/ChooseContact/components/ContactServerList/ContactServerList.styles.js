import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  title: {
    color: colors.contactsTitleFont,
    fontSize: fonts.size.extraSmall,
    fontWeight: fonts.weight.medium,
  },
  titleContainer: {
    marginTop: 4,
  },
  cardContent: {
    marginLeft: 6,
  },
  phoneContactName: {
    color: colors.baseFont,
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.small,
    marginBottom: 4,
  },
  duniaContactName: {
    color: colors.baseFont,
    opacity: 0.6,
    fontSize: fonts.size.extraSmall,
  },
});
