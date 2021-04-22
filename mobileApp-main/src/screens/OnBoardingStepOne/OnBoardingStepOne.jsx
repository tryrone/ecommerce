import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ANALYTICS_EVENTS } from 'helpers/constants';
import amplitudeInstance from 'helpers/amplitude.helper';

import OnBoarding from 'components/OnBoarding';

function OnBoardingStepOne({ navigation }) {
  useEffect(() => {
    amplitudeInstance.logEvent(ANALYTICS_EVENTS.START_ONBOARDING);
  }, []);

  const onContinuePress = useCallback(() => {
    navigation.navigate('OnBoardingStepTwo');
  }, [navigation]);

  return (
    <OnBoarding
      title="Instant Money Transfers"
      subTitle="Send money to any phone number with a registered mobile money account or send money using the receiver's DuniaPay username."
      buttonName="Continue"
      linkName="Skip"
      onContinuePress={onContinuePress}
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
