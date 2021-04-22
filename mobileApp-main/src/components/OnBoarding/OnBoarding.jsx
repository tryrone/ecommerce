import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import * as userActions from 'resources/user/user.actions';

import OnBoardingImage from 'assets/images/onBoarding.png';

import ProgressIndicator from './components/ProgressIndicator';

import styles from './OnBoarding.styles';

function OnBoarding({
  title,
  subTitle,
  buttonName,
  linkName,
  onContinuePress,
  handleSkipOnBoarding,
  currentStep,
  navigation,
}) {
  const dispatch = useDispatch();

  const handleSkip = useCallback(async () => {
    handleSkipOnBoarding();
    dispatch(userActions.hideOnboarding(true));
  }, [handleSkipOnBoarding, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.linkWrapper}>
        {Boolean(linkName) && (
          <ButtonLink
            onPress={handleSkip}
            textStyle={styles.linkText}
            buttonStyle={styles.link}
            title={linkName}
          />
        )}
      </View>
      <View style={styles.container}>
        <Image source={OnBoardingImage} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <ProgressIndicator currentStep={currentStep} stepCount={4} />
        <View style={styles.buttonWrapper}>
          <Button
            onPress={onContinuePress}
            title={buttonName}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

OnBoarding.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  onContinuePress: PropTypes.func.isRequired,
  linkName: PropTypes.string,
  currentStep: PropTypes.number,
  handleSkipOnBoarding: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

OnBoarding.defaultProps = {
  linkName: '',
  currentStep: 1,
  handleSkipOnBoarding: () => {},
  navigation: {},
};

export default OnBoarding;
