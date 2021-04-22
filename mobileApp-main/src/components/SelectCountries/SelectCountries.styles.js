import { StyleSheet, Platform } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

const zIndexContainer = Platform.OS === 'ios' && { zIndex: 10 };

export default StyleSheet.create({
  container: {
    ...zIndexContainer,
  },
  dropdownContainer: {
    height: 45,
  },
  input: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderColor: colors.inputStandardBorder,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  arrow: {
    marginLeft: 20,
  },
  label: {
    marginBottom: 7,
    color: colors.inputLabel,
    lineHeight: fonts.lineHeight.medium,
    fontSize: fonts.size.small,
  },
  dropdown: {
    backgroundColor: colors.white,
    overflow: 'scroll',
  },
  selectedLabel: {
    color: colors.black,
  },
  placeholderStyle: {
    color: colors.black,
  },
  activeLabel: {
    color: colors.gray,
  },
  item: {
    justifyContent: 'flex-start',
  },
  inputDisabled: {
    height: 45,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.inputStandardBorder,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: colors.inputDisabled,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  countryDisabled: {
    marginLeft: 12,
    fontSize: fonts.size.small,
    color: colors.black,
  },
  arrowDownDisabled: {
    marginLeft: 'auto',
    marginRight: 16,
  },
});
