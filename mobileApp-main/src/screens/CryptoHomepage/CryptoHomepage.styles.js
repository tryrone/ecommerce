import { StyleSheet } from 'react-native';

import { HOMEPAGE_HEADER } from 'helpers/constants';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerStyle: {
    height: HOMEPAGE_HEADER.FULL_CRYPTO_HEIGHT - 30,
  },
  iconContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 16,
  },
  title: {
    color: colors.black,
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.medium,
    lineHeight: fonts.lineHeight.regular,
    marginBottom: 26,
  },
  divideLine: {
    marginVertical: 24,
    borderColor: colors.black,
    width: '100%',
    borderWidth: 1,
    opacity: 0.1,
    borderStyle: 'solid',
  },
});
