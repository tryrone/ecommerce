import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  cardContent: {
    flex: 1,
  },
  poolName: {
    color: colors.black,
    fontSize: fonts.small,
  },
  poolAmount: {
    color: colors.black,
    fontWeight: fonts.weight.bold,
  },
  poolInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  poolMembers: {
    flexDirection: 'row',
    marginRight: 8,
    marginLeft: 10,
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
  successScreen: {
    backgroundColor: colors.mainScreenBackground,
  },
  amountMoney: {
    fontWeight: fonts.weight.bold,
  },
});
