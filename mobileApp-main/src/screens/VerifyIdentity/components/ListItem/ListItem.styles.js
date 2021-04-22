import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: normalizeSpace(24),
    maxWidth: '90%',
  },
  title: {
    fontSize: fonts.size.regular,
    lineHeight: fonts.lineHeight.medium,
    marginLeft: 13,
  },
});
