import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  badgeTitle: (color) => ({
    paddingVertical: 6,
    paddingHorizontal: 8,
    textTransform: 'capitalize',
    fontSize: 12,
    color,
  }),
  badgeWrapper: (color) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: color,
    opacity: 0.1,
    borderRadius: 5,
  }),
});
