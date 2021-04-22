import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  iconContainer: {
    width: normalizeSpace(94),
    height: normalizeSpace(94),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  choosedIconContainer: {
    borderWidth: 2,
    borderColor: colors.theme,
  },
  providerName: {
    marginTop: 5,
    fontSize: fonts.size.extraSmall,
    lineHeight: fonts.lineHeight.small,
    color: colors.gray,
    textTransform: 'capitalize',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 18,
    width: 18,
    backgroundColor: colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
