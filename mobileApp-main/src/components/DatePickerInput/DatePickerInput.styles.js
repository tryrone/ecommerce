import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  datePickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 45,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.inputStandardBorder,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  datePickerIOS: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    opacity: 0.1,
    width: 30,
  },
  label: {
    marginBottom: 7,
    color: colors.inputLabel,
    lineHeight: fonts.lineHeight.medium,
    fontSize: fonts.size.small,
  },
  input: {
    marginBottom: 17,
  },
});
