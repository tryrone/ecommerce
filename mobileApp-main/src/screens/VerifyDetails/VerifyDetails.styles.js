import { StyleSheet } from 'react-native';

import styles from 'themes/commonStyles';
import colors from 'themes/colors';
import { normalizeSpace } from 'helpers/utils.helper';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: colors.mainScreenBackground,
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  screen: {
    ...styles.mainScreenStyle,
    justifyContent: 'space-between',
  },
  formWrapper: {
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 'auto',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: normalizeSpace(33),
    marginTop: 20,
  },
  successScreen: {
    backgroundColor: colors.mainScreenBackground,
  },
});
