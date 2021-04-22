import { StyleSheet, Dimensions } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    height: 57,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginRight: 'auto',
  },
  cardTitle: {
    color: colors.black,
    marginTop: 7,
    marginLeft: 'auto',
    fontSize: fonts.size.extraSmall,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 0,
    color: colors.theme,
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.medium,
  },
  wrapperInputMoney: {
    width: width / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    marginLeft: 'auto',
    marginRight: 5,
    color: colors.theme,
    fontWeight: fonts.weight.bold,
    fontSize: fonts.size.medium,
  },
});
