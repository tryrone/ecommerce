import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  initials: {
    color: colors.contactInitials,
    fontWeight: fonts.weight.medium,
  },
  profileContainer: {
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: colors.contactProfileBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
