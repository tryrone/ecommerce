import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  exchangeButtonWrapper: {
    borderRadius: 30,
    position: 'absolute',
    top: 40,
    left: 60,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
