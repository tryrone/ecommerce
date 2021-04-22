import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  cellStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.inputStandardBorder,
  },
  cellStyleError: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
  },
  cellStyleFocused: {
    borderWidth: 2,
  },
  cellTextStyle: {
    color: colors.baseFont,
    fontSize: fonts.size.extraLarge,
    fontWeight: fonts.weight.regular,
    fontFamily: fonts.type.base,
  },
});
