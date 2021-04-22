import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  header: {
    position: 'relative',
    marginHorizontal: 16,
    marginTop: 28,
    justifyContent: 'flex-start',
  },
  leftElement: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  title: {
    color: colors.gray,
  },
  text: {
    color: colors.black,
    fontSize: fonts.size.small,
    lineHeight: fonts.lineHeight.small,
    textAlign: 'center',
  },
  hiddenBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  hiddenBalanceText: {
    color: colors.black,
    fontSize: fonts.size.medium,
    fontWeight: fonts.weight.bold,
    marginLeft: 12,
  },
  headerSubtitle: {
    color: colors.black,
    fontSize: fonts.size.mediumLarge,
    lineHeight: fonts.lineHeight.extraLarge,
    letterSpacing: fonts.letterSpacing.regular,
    fontWeight: fonts.weight.bold,
    textAlign: 'center',
    marginBottom: 40,
  },
  smallHeaderSubtitle: {
    fontSize: fonts.size.medium,
  },
  cryptoHeaderSubtitle: {
    marginBottom: 4,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalizeSpace(40),
  },
  actionContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 50,
    height: 50,
    backgroundColor: colors.theme,
    marginBottom: 4,
  },
  cryptoContainer: {
    marginBottom: 20,
  },
});
