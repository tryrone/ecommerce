import { StyleSheet, Dimensions } from 'react-native';

import { sizeQrCode } from 'helpers/utils.helper';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 10,
  },
  phoneContactName: {
    color: colors.baseFont,
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.regular,
    marginBottom: 4,
  },
  duniaContactName: {
    color: colors.baseFont,
    opacity: 0.6,
    fontSize: fonts.size.small,
  },
  contactContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    position: 'absolute',
    marginTop: (Dimensions.get('window').height * 3) / 4,
    borderRadius: 10,
    width: sizeQrCode,
  },
  marker: {
    borderColor: colors.theme,
    borderRadius: 10,
    width: sizeQrCode,
    height: sizeQrCode,
  },
  camera: {
    paddingTop: 36,
    height: '100%',
  },
});
