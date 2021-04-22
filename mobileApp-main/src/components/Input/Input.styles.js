import { StyleSheet } from 'react-native';

import colors from 'themes/colors';

export default StyleSheet.create({
  inputContainer: {
    height: 45,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.inputStandardBorder,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  disabled: {
    backgroundColor: colors.inputDisabled,
    borderColor: colors.inputStandardBorder,
  },
  input: {
    width: '100%',
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  label: {
    marginBottom: 7,
    color: colors.inputLabel,
  },
  inputCorrect: {
    borderColor: colors.inputCorrect,
  },
  inputFocused: {
    borderColor: colors.inputFocused,
  },
  inputError: {
    borderColor: colors.inputErrorBorder,
  },
  containerError: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textError: {
    color: colors.inputErrorText,
  },
  warning: {
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  leftIcon: {
    marginRight: 6,
  },
});
