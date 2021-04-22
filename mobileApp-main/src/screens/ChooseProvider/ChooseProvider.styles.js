import { StyleSheet } from 'react-native';

import { normalizeSpace } from 'helpers/utils.helper';

import fonts from 'themes/fonts';
import colors from 'themes/colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  cardsContainer: {
    marginTop: normalizeSpace(30),
    marginHorizontal: normalizeSpace(16),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  airtimeContainer: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: fonts.size.small,
    marginTop: 80,
    marginBottom: normalizeSpace(30),
    color: colors.gray,
    textAlign: 'center',
  },
  input: {
    marginHorizontal: normalizeSpace(21),
  },
  button: {
    marginTop: 'auto',
    marginBottom: normalizeSpace(30),
    marginHorizontal: 23,
  },
});
