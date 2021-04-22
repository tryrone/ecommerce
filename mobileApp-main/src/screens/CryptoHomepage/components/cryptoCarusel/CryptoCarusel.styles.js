import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  carusel: {
    flex: 1,
  },
  caruselCard: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    color: colors.black,
    fontWeight: fonts.weight.medium,
    fontSize: fonts.size.medium,
  },
  subTitle: {
    marginTop: 10,
    color: colors.gray,
    fontSize: fonts.size.extraSmall,
    lineHeight: fonts.lineHeight.small,
  },
  dotWrapper: {
    paddingTop: 10,
    paddingBottom: 21,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.linkFont,
  },
  inactiveDotStyle: {
    width: 17,
    height: 17,
    borderRadius: 17,
    backgroundColor: colors.linkFont,
    opacity: 0.2,
  },
});
