import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  poolContainer: {
    flex: 1,
  },
  poolMembersContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  poolMember: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  poolMemberAvatarContainer: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderRadius: 16,
  },
  poolMemberAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  poolMemberName: {
    flexGrow: 1,
    color: colors.black,
    fontSize: fonts.size.medium,
    marginLeft: 10,
  },
  poolMemberBudget: {
    color: colors.black,
    fontWeight: fonts.weight.bold,
  },
  addMemberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMemberText: {
    marginLeft: 10,
    color: colors.linkFont,
  },
});
