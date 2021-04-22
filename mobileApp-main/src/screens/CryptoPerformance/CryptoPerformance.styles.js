import { StyleSheet } from 'react-native';

import colors from 'themes/colors';
import fonts from 'themes/fonts';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.mainScreenBackground,
  },
  scrollableContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  screenContent: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: 'space-between',
  },
  chartContainer: {
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  chartLoaderContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartError: {
    color: colors.theme,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  chartOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  chartOption: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: colors.themeLight,
  },
  chartOptionText: {
    fontSize: fonts.size.extraSmall,
    fontWeight: fonts.weight.medium,
    color: colors.theme,
  },
  chartOptionSelected: {
    backgroundColor: colors.theme,
  },
  chartOptionTextSelected: {
    color: colors.white,
  },
});
