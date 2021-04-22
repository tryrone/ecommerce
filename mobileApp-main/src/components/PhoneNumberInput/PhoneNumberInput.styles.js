import { StyleSheet, Platform } from 'react-native';
import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 20,
  },
  text: {
    color: colors.baseFont,
    fontSize: fonts.size.medium,
    fontWeight: fonts.weight.regular,
  },
  label: {
    color: colors.inputLabelInput,
    fontSize: fonts.size.small,
    marginBottom: 7,
  },
  codeText: {
    marginBottom: Platform.OS === 'android' ? 2 : 0,
  },
  phoneText: {
    letterSpacing: fonts.letterSpacing.large,
  },
  error: {
    color: colors.inputErrorText,
    fontSize: fonts.size.small,
    left: 0,
    paddingTop: 8,
  },
  inputContainer: {
    borderRadius: 10,
    borderColor: colors.inputStandardBorder,
    borderWidth: StyleSheet.hairlineWidth,
    height: 45,
    width: '100%',
  },
  inputContainerError: {
    borderColor: colors.inputErrorBorder,
  },
  countryInputContainer: {
    backgroundColor: colors.authScreenBackground,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: colors.inputStandardBorder,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  textInputContainer: {
    backgroundColor: colors.authScreenBackground,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 0,
  },
});
