import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import AuthHeader from 'components/AuthHeader';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import HeaderWithBackArrow from 'components/HeaderWithBackArrow';
import VerifyCode from 'components/VerifyCode';

import styles from './ResetCode.styles';

function ResetCode({ navigation, route }) {
  const { phoneNumber } = route.params;

  const onBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onContinue = useCallback(
    async (verificationToken) => {
      navigation.reset({
        index: 0,
        routes: [
          { name: 'ForgotPassword' },
          { name: 'ResetPassword', params: { verificationToken } },
        ],
      });
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
          <AuthHeader
            title="Enter your reset code"
            subtitle={`Copy the SMS we sent to ${phoneNumber} and come back to this screen`}
            withLogo
          />
        </HeaderWithBackArrow>
      </AuthHeaderLayout>
      <VerifyCode phoneNumber={phoneNumber} handleSubmit={onContinue} />
    </View>
  );
}

ResetCode.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      phoneNumber: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ResetCode;
