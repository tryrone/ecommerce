import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  card: {
    height: 78,
    paddingLeft: 15,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  rightCardPart: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 16,
  },
  cardContent: {
    marginLeft: 11,
    width: '55%',
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
