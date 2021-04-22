import { StyleSheet } from 'react-native';

import styles from 'themes/commonStyles';

export default StyleSheet.create({
  screenContent: {
    ...styles.authScreenStyle,
  },
  authHeaderLayout: {
    paddingTop: '15%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 30,
  },
});
