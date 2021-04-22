import { StyleSheet, Dimensions } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
  },
  passwordInput: {
    marginTop: normalizeSpace(40),
  },
  passwordRulesWrapper: {
    marginTop: 10,
  },
  container: {
    flexGrow: 1,
  },
  wrapper: {
    flex: 1,
  },
  wrapperInput: {
    marginHorizontal: 23,
    marginTop: height < 600 ? 10 : 50,
  },
  wrapperButton: {
    marginTop: 'auto',
    marginHorizontal: 23,
  },
  button: {
    marginTop: normalizeSpace(33),
    marginBottom: normalizeSpace(33),
  },
});
