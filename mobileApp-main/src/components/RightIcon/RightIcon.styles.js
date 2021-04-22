import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  text: {
    color: colors.theme,
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    right: 16,
  },
});
