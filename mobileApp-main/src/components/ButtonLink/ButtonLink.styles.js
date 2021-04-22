import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';

export default StyleSheet.create({
  link: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: fonts.size.regular,
    fontWeight: fonts.weight.regular,
    lineHeight: fonts.lineHeight.medium,
  },
});
