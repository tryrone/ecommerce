import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  title: {
    color: colors.contactsTitleFont,
    fontSize: fonts.size.extraSmall,
    fontWeight: fonts.weight.medium,
  },
  cardContent: {
    marginLeft: 6,
  },
  phoneContactName: {
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.small,
    marginBottom: 4,
  },
});
