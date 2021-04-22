import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfoContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    width: '65%',
    alignItems: 'center',
  },
  divideLine: {
    borderColor: colors.contactsBorder,
    borderWidth: 1,
  },
});
