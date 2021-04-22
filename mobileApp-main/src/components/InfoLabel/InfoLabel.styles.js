import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  label: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  labelSuccess: {
    backgroundColor: colors.successLabelBackground,
  },
  labelError: {
    backgroundColor: colors.errorLabelBackground,
  },
  labelText: {
    fontSize: fonts.size.extraSmall,
    fontWeight: fonts.weight.medium,
  },
  labelTextSuccess: {
    color: colors.successLabelText,
  },
  labelTextError: {
    color: colors.errorLabelText,
  },
});
