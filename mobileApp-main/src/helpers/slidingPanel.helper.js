import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const PANEL_VELOCITY = 2.3;
const FIAT_SMALL_SCREEN = -30;
const CRYPTO_SMALL_SCREEN = -50;
const FIAT_BIG_SCREEN = -40;
const CRYPTO_BIG_SCREEN = -60;

export const getSliderProps = (draggableRange, draggedValue, isCrypto) => {
  const snappingPoints = [draggableRange.top, draggableRange.bottom];

  const getOutputRange = () => {
    if (height < 600) {
      if (isCrypto) return CRYPTO_SMALL_SCREEN;
      return FIAT_SMALL_SCREEN;
    }
    if (isCrypto) return CRYPTO_BIG_SCREEN;
    return FIAT_BIG_SCREEN;
  };

  const minOutputRange = getOutputRange();

  const textTitleTranslateY = draggedValue.interpolate({
    inputRange: [draggableRange.bottom, draggableRange.top],
    outputRange: [0, minOutputRange],
    extrapolate: 'clamp',
  });

  const textTitleScale = draggedValue.interpolate({
    inputRange: [draggableRange.bottom, draggableRange.top],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const textSubtitleScale = draggedValue.interpolate({
    inputRange: [draggableRange.bottom, draggableRange.top],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerStyles = {
    subtitle: {
      transform: [
        { scale: textTitleScale },
        { translateY: textTitleTranslateY },
      ],
    },
    title: {
      transform: [
        { scale: textSubtitleScale },
        { translateY: textTitleTranslateY },
      ],
    },
  };

  const hideFullScreenPanelOptions = {
    velocity: PANEL_VELOCITY,
    toValue: draggableRange.bottom,
  };

  return {
    hideFullScreenPanelOptions,
    headerStyles,
    snappingPoints,
    textSubtitleScale,
  };
};
