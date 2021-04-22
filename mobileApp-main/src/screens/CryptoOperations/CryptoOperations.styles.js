import { StyleSheet, Dimensions } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
  },
  container: {
    flex: 1,
  },
  headerSubTitle: {
    marginTop: 32,
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.dynamicCryptoBackground,
    color: colors.inputCorrect,
  },
  isNegativeBalance: {
    backgroundColor: colors.notEnoughBalanceBackground,
    color: colors.red,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: height > 700 ? 36 : 10,
  },
  button: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: normalizeSpace(30),
    height: normalizeSpace(58),
  },
  successScreen: {
    backgroundColor: colors.mainScreenBackground,
  },
  errorTitle: {
    marginTop: 10,
    color: colors.red,
    textAlign: 'center',
  },
  amountMoney: {
    fontWeight: fonts.weight.bold,
  },
});
