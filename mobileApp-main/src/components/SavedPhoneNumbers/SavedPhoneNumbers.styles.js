import { StyleSheet } from 'react-native';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  cardsContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    flex: 1,
  },
  card: {
    marginBottom: 16,
    height: 78,
  },
  emptyPhoneNumbers: {
    flex: 1,
    alignItems: 'center',
  },
  cardContent: {
    marginLeft: 21,
    width: '60%',
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
  buttonAddNumber: {
    marginTop: 'auto',
    marginBottom: 30,
  },
});
