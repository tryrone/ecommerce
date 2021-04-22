import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';
import commonStyles from 'themes/commonStyles';

export default StyleSheet.create({
  screen: {
    ...commonStyles.mainScreenStyle,
  },
  screenHeader: {
    position: 'relative',
    paddingTop: 28,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    left: 0,
    top: 20,
  },
  screenTitle: {
    fontSize: fonts.size.large,
    fontWeight: fonts.weight.bold,
    color: colors.black,
  },
  screenSubtitle: {
    marginTop: 37,
    fontSize: fonts.size.small,
    color: colors.gray,
  },
  scrollableScreenContent: {
    flexGrow: 1,
  },
  screenContent: {
    flex: 1,
    paddingVertical: 30,
  },
  poolsContainer: {
    flex: 1,
  },
});
