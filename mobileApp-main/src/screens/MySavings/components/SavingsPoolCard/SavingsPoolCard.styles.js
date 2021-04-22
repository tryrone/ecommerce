import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  poolContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  poolInfo: {
    flex: 1,
    marginRight: 15,
  },
  poolInfoFirstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  poolInfoSecondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  poolName: {
    fontSize: fonts.size.small,
  },
  poolAmount: {
    fontWeight: fonts.weight.bold,
    marginTop: 10,
  },
  poolMembers: {
    flexDirection: 'row',
  },
  poolMember: {
    marginLeft: -10,
  },
  poolMemberAvatar: {
    width: 32,
    height: 32,
    borderWidth: 0,
    borderRadius: 16,
  },
  poolMemberAvatarContainer: {
    width: 32,
    height: 32,
    borderWidth: 0,
    borderRadius: 16,
  },
  poolMemberInitialsContainer: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: colors.white,
  },
  rightArrow: {
    alignSelf: 'center',
  },
});
