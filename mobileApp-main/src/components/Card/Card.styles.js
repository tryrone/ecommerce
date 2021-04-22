import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 15,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightIcon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
});
