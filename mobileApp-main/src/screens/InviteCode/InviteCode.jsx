import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import HeaderWithBackArrow from 'components/HeaderWithBackArrow';
import AuthHeader from 'components/AuthHeader';
import ProgressBar from 'components/ProgressBar';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import VerifyCode from 'components/VerifyCode';

import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';

import styles from './InviteCode.styles';

function InviteCode({ navigation, route }) {
  const { phoneNumber } = route.params;

  const onBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onContinue = useCallback(
    async (verificationToken) => {
      navigation.reset({
        index: 0,
        routes: [
          { name: 'SignUp' },
          { name: 'CreateAccount', params: { verificationToken } },
        ],
      });
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.COMPLETE_VERIFY_NUMBER);
    },
    [navigation],
  );

  return (
    <View style={styles.screenContent}>
      <AuthHeaderLayout style={styles.authHeaderLayout}>
        <HeaderWithBackArrow
          style={styles.header}
          onBackNavigation={onBackNavigation}
        >
          <ProgressBar currentStep={1} totalSteps={3} />
        </HeaderWithBackArrow>
        <AuthHeader
          title="Enter your invite code"
          subtitle={`Copy the invite SMS we sent to ${phoneNumber} and come back to this screen`}
        />
      </AuthHeaderLayout>
      <VerifyCode phoneNumber={phoneNumber} handleSubmit={onContinue} />
    </View>
  );
}

InviteCode.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default InviteCode;
