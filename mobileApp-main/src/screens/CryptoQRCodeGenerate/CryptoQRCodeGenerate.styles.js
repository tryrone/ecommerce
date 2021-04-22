import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
  },
  screenContent: {
    flex: 1,
    marginTop: 19,
    marginBottom: 30,
    marginHorizontal: 23,
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  shareButton: {
    marginTop: 'auto',
    width: '100%',
  },
  container: {
    marginTop: normalizeSpace(20),
  },
  cryptoAddressContainer: {
    marginTop: normalizeSpace(8),
    flexDirection: 'row',
  },
  cryptoAddress: {
    marginLeft: 8,
    marginRight: 23,
  },
});
