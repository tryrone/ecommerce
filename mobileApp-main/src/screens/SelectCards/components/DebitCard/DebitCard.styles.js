import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 16,
  },
  cardBrandIcon: {
    marginRight: 18,
  },
  cardNumber: {
    height: 20,
    width: 150,
  },
  cardHolder: {
    marginTop: 10,
    color: colors.gray,
    fontSize: fonts.size.extraSmall,
    lineHeight: fonts.lineHeight.small,
  },
  cardRemove: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingRight: 16,
  },
  cardRemoveText: {
    color: colors.linkFont,
  },
});
