import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  avatarContainer: {
    width: 36,
    height: 36,
    borderWidth: 3,
    borderColor: colors.profileBorder,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  initials: {
    textAlign: 'center',
  },
});
