import { StyleSheet, Dimensions } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 16,
  },
  textContainer: {
    marginTop: height < 700 ? 0 : 26,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    color: colors.gray,
    lineHeight: fonts.lineHeight.regular,
  },
  linkText: {
    color: colors.theme,
    fontWeight: fonts.weight.bold,
  },
});
