import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';
import { normalizeSpace } from 'helpers/utils.helper';

export default StyleSheet.create({
  socialWrapper: {
    alignItems: 'center',
    marginBottom: normalizeSpace(16),
  },
  socialText: {
    fontSize: fonts.size.extraSmall,
    color: colors.inputPlaceholder,
  },
  socialButtonsWrapper: {
    flexDirection: 'row',
    marginTop: normalizeSpace(11),
  },
  socialButton: {
    marginRight: 15,
  },
});
