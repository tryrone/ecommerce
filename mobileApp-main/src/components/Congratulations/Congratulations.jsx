import React from 'react';
import { Image, SafeAreaView, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Button from 'components/Button';

import successImage from 'assets/images/success.png';

import styles from './Congratulations.styles';

function Congratulations({
  title: propsTitle,
  subTitle: propsSubTitle,
  buttonName: propsButtonName,
  onContinuePress: propsContinuePress,
  route,
  screenStyle: propsScreenStyle,
}) {
  const title = propsTitle || route.params.title;
  const subTitle = propsSubTitle || route.params.subTitle;
  const onContinuePress = propsContinuePress || route.params.onContinuePress;
  const buttonName = propsButtonName || route.params.buttonName;
  const screenStyle = propsScreenStyle || route.params.screenStyle;

  return (
    <SafeAreaView style={[styles.screen, screenStyle]}>
      <View style={styles.container}>
        <Image source={successImage} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onContinuePress} title={buttonName} />
      </View>
    </SafeAreaView>
  );
}

Congratulations.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  buttonName: PropTypes.string,
  onContinuePress: PropTypes.func,
  screenStyle: ViewPropTypes.style,
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string,
      subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      onContinuePress: PropTypes.func,
      buttonName: PropTypes.string,
      screenStyle: ViewPropTypes.style,
    }),
  }),
};

Congratulations.defaultProps = {
  title: '',
  subTitle: '',
  buttonName: '',
  onContinuePress: null,
  screenStyle: null,
  route: {
    params: {
      title: '',
      subTitle: '',
      onContinuePress: () => {},
      buttonName: '',
      screenStyle: null,
    },
  },
};

export default Congratulations;
