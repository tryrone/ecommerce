import { StyleSheet, Dimensions } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

const { height } = Dimensions.get('window');
const linkBottomPading = () => {
  if (height > 700) return 54;
  if (height < 600) {
    return 0;
  }
  return 20;
};

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.authScreenBackground,
    paddingTop: normalizeSpace(31),
  },
  linkWrapper: {
    marginTop: 'auto',
    paddingBottom: linkBottomPading(),
  },
  linkText: {
    color: colors.baseFont,
    fontFamily: fonts.type.title,
    letterSpacing: fonts.letterSpacing.regular,
    opacity: 0.7,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: height > 700 ? 31 : 11,
  },
  link: {
    position: 'absolute',
    right: 20,
  },
  button: {
    height: normalizeSpace(58),
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
  },
  title: {
    fontFamily: fonts.type.title,
    fontSize: fonts.size.large,
    fontWeight: fonts.weight.bold,
    lineHeight: fonts.lineHeight.large,
    alignSelf: 'center',
    letterSpacing: fonts.letterSpacing.regular,
  },
  subTitle: {
    fontSize: fonts.size.small,
    lineHeight: fonts.lineHeight.medium,
    paddingHorizontal: normalizeSpace(13),
    textAlign: 'center',
    fontFamily: fonts.type.title,
    marginBottom: 2,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 23,
  },
});
