import styles from 'themes/fonts';
import colors from 'themes/colors';

const heroTitle = {
  color: colors.baseFont,
  fontSize: styles.size.extraLarge, // 24
  fontWeight: styles.weight.bold, // 700
  letterSpacing: styles.letterSpacing.regular, // 0.5
};

const authScreenStyle = {
  paddingHorizontal: 23,
  flex: 1,
  backgroundColor: colors.authScreenBackground,
};

const mainScreenStyle = {
  paddingHorizontal: 16,
  flex: 1,
  backgroundColor: colors.mainScreenBackground,
};

export default { heroTitle, authScreenStyle, mainScreenStyle };
