import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.authScreenBackground,
  },
  authHeaderLayout: {
    paddingTop: '15%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  swapIcon: {
    marginHorizontal: 16,
  },
  continueButtonWrapper: {
    marginTop: 'auto',
    width: '100%',
    marginBottom: normalizeSpace(33),
  },
});
