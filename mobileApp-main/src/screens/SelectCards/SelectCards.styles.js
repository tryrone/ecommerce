import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  screenContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.mainScreenBackground,
  },
  cardsContainer: {
    flex: 1,
  },
});
