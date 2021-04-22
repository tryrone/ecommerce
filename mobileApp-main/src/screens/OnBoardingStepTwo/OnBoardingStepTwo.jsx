import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import OnBoarding from 'components/OnBoarding';

function OnBoardingStepOne({ navigation }) {
  const onContinuePress = useCallback(() => {
    navigation.navigate('OnBoardingStepThree');
  }, [navigation]);

  return (
    <OnBoarding
      title="Invest in Bitcoin"
      subTitle="Trade Bitcoin with DuniaPay. Buy, send and receive your cryptocurrency without hassle."
      buttonName="Continue"
      linkName="Skip"
      onContinuePress={onContinuePress}
      currentStep={2}
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
