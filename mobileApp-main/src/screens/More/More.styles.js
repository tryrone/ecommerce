import { StyleSheet } from 'react-native';

import styles from 'themes/commonStyles';
import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    ...styles.mainScreenStyle,
  },
  card: {
    height: 94,
    marginTop: 16,
    paddingLeft: 15,
  },
  arrow: {
    marginRight: 15,
  },
  cardContent: {
    marginLeft: 21,
    width: '70%',
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
});
