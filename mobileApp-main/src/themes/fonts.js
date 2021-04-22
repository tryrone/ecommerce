import { normalizeFontSize } from 'helpers/utils.helper';

const type = {
  base: 'Roboto',
  title: 'Poppins-Regular',
};

const letterSpacing = {
  small: 0,
  regular: 0.5,
  large: 3,
};

const size = {
  extraExtraSmall: normalizeFontSize(10),
  extraSmall: normalizeFontSize(12),
  small: normalizeFontSize(14),
  regular: normalizeFontSize(16),
  medium: normalizeFontSize(18),
  large: normalizeFontSize(20),
  extraLarge: normalizeFontSize(24),
  mediumLarge: normalizeFontSize(30),
  extraExtraLarge: normalizeFontSize(36),
  extraExtraExtraLarge: normalizeFontSize(62),
};

const lineHeight = {
  extraSmall: normalizeFontSize(14),
  small: normalizeFontSize(16),
  regular: normalizeFontSize(21),
  medium: normalizeFontSize(24),
  large: normalizeFontSize(30),
  extraLarge: normalizeFontSize(42),
};

const weight = {
  light: '300',
  regular: '400',
  medium: '500',
  bold: '700',
};

const style = {};

export default {
  type,
  size,
  weight,
  style,
  lineHeight,
  letterSpacing,
};
