import React, { useCallback } from 'react';
import { View, TouchableOpacity, ViewPropTypes } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import RightIcon from 'components/RightIcon';
import Text from 'components/Text';

import BackIcon from 'assets/icons/blackBackIcon.svg';

import styles from './MainHeader.styles';

function MainHeader({
  scene,
  title: titleHeader,
  subTitle: subTitleHeader,
  handleRightIconClick,
  handleLeftIconClick,
  rightIconStyle: rightIconStyleProps,
  rightCornerText: textProps,
  rightIcon: rightIconHeader,
}) {
  const navigation = useNavigation();

  const title = titleHeader || scene.descriptor.options.title;
  const subTitle = subTitleHeader || scene.descriptor.options.subTitle;
  const rightIconText = textProps || scene.descriptor.options.rightCornerText;
  const rightIconStyle =
    rightIconStyleProps || scene.descriptor.options.rightIconStyleProps;
  const rightIcon = rightIconHeader || scene.descriptor.options.rightIconHeader;

  const handleGoBack = useCallback(() => {
    if (handleLeftIconClick) return handleLeftIconClick();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    return null;
  }, [navigation]);

  return (
    <View style={styles.header}>
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={handleGoBack} style={styles.arrowBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        {rightIcon && (
          <RightIcon
            onRightIconClick={handleRightIconClick}
            rightIconStyle={rightIconStyle}
            rightIconText={rightIconText}
            rightIcon={rightIcon}
          />
        )}
      </View>
      {Boolean(subTitle) && (
        <Text style={styles.headerSubTitle}>{subTitle}</Text>
      )}
    </View>
  );
}

MainHeader.propTypes = {
  scene: PropTypes.shape({
    descriptor: PropTypes.shape({
      options: PropTypes.shape({
        title: PropTypes.string,
        subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        rightCornerText: PropTypes.string,
        rightIconStyleProps: ViewPropTypes.style,
        rightIconHeader: PropTypes.elementType,
      }),
    }),
  }),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  handleRightIconClick: PropTypes.func,
  rightIconStyle: ViewPropTypes.style,
  handleLeftIconClick: PropTypes.func,
  rightCornerText: PropTypes.string,
  rightIcon: PropTypes.elementType,
};

MainHeader.defaultProps = {
  scene: {
    descriptor: {
      options: {
        subTitle: null,
      },
    },
  },
  title: '',
  subTitle: '',
  rightIconStyle: null,
  rightCornerText: '',
  handleRightIconClick: () => {},
  handleLeftIconClick: null,
  rightIcon: null,
};

export default MainHeader;
