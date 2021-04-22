import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  stepActive: {
    backgroundColor: colors.theme,
    width: 26,
    height: 2,
    marginRight: 2,
  },
  stepPassive: {
    backgroundColor: colors.passiveTheme,
  },
});
