import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
  },
  screenContent: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 19,
    paddingRight: 26,
  },
  contactsList: {
    paddingTop: 20,
  },
  inviteContainer: {
    bottom: 2,
  },
});
