import { StyleSheet } from 'react-native';

import commonStyles from 'themes/commonStyles';

export default StyleSheet.create({
  screen: {
    ...commonStyles.mainScreenStyle,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
});
