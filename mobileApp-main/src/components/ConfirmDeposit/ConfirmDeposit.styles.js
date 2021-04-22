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
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: height > 700 ? 25 : 0,
  },
  wrapperInput: {
    flexDirection: 'row',
    marginHorizontal: 30,
    alignItems: 'center',
  },
  inputText: {
    color: colors.theme,
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.extraExtraExtraLarge,
  },
  currency: {
    marginRight: 25,
  },
  subTitle: {
    color: colors.gray,
    marginTop: height > 700 ? 2 : 0,
    fontSize: fonts.size.small,
    lineHeight: fonts.lineHeight.regular,
  },
  error: {
    textAlign: 'center',
    marginTop: height > 700 ? 2 : 0,
    fontSize: fonts.size.small,
    color: colors.red,
  },
  message: {
    color: colors.gray,
    fontSize: fonts.size.small,
    marginTop: height > 700 ? 2 : 0,
  },
  buttonConfirm: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: normalizeSpace(30),
    height: normalizeSpace(58),
  },
  card: {
    height: height > 600 ? 78 : 60,
    marginTop: height > 700 ? 20 : 10,
  },
  textStyle: {
    width: '60%',
  },
});
