import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  status: {
    color: colors.gray,
    fontSize: fonts.size.extraSmall,
    marginRight: 10,
  },
  failedStatus: {
    color: colors.red,
  },
});
