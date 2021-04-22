import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import OnBoarding from 'components/OnBoarding';

function OnBoardingStepOne({ navigation }) {
  const onContinuePress = useCallback(() => {
    navigation.navigate('OnBoardingStepFour');
  }, [navigation]);

  return (
    <OnBoarding
      title="Airtime Top Ups"
      subTitle="Purchase airtime for yourself, friends and family from dozens of telecom companies with a simple tap."
      buttonName="Continue"
      linkName="Skip"
      onContinuePress={onContinuePress}
      currentStep={3}
      navigation={navigation}
    />
  );
}

OnBoardingStepOne.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnBoardingStepOne;
