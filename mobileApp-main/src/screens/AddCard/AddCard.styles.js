import { StyleSheet } from 'react-native';
import colors from 'themes/colors';

export default StyleSheet.create({
  screenContent: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.mainScreenBackground,
  },
  cardFieldRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  cardField: {
    marginBottom: 15,
  },
  cardFieldLeft: {
    flex: 1,
    marginRight: 18,
  },
  cardFieldRight: {
    flex: 1,
  },
  input: {
    height: 45,
    backgroundColor: colors.white,
  },
  cardFieldLabel: {
    marginBottom: 7,
    color: colors.inputLabel,
  },
});
