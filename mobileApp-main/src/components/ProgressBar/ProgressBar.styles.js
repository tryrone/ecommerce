import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  bar: {
    position: 'relative',
    width: '100%',
    height: 6,
    backgroundColor: colors.barBackground,
    borderRadius: 8,
  },
  progress: {
    position: 'absolute',
    left: 0,
    height: 6,
    borderRadius: 8,
    backgroundColor: colors.progressBackground,
    width: 20,
  },
  label: {
    fontSize: fonts.size.small,
    color: colors.labelProgressBar,
    marginBottom: 10,
  },
});
