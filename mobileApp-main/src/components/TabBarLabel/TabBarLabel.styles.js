import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  text: {
    fontSize: fonts.size.extraExtraSmall,
  },
  activeText: {
    fontWeight: fonts.weight.bold,
    color: colors.white,
  },
  inActiveText: {
    color: colors.inActiveTabBarFont,
  },
});
