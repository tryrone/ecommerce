import { StyleSheet } from 'react-native';

import styles from 'themes/commonStyles';
import colors from 'themes/colors';
import { normalizeSpace } from 'helpers/utils.helper';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
  },
  screen: {
    ...styles.mainScreenStyle,
    justifyContent: 'space-between',
    marginBottom: normalizeSpace(33),
  },
});
