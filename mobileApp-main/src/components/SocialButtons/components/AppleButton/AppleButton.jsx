import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert, ViewPropTypes } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import Button from 'components/Button';

import * as userActions from 'resources/user/user.actions';

import AppleIcon from 'assets/icons/apple.svg';

function AppleButton({ handleAppleSubmit, style }) {
  const handleAppleSignIn = useCallback(async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        await handleAppleSubmit(appleAuthRequestResponse.identityToken);
      }
    } catch (e) {
      if (e.code === appleAuth.Error.CANCELED) {
        return;
      }
      const errorMessage = e.data?.message || 'Something went wrong';
      Alert.alert('', errorMessage);
      userActions.logOut();
    }
  }, [handleAppleSubmit]);

  return (
    <Button
      icon={AppleIcon}
      type="social"
      style={style}
      onPress={handleAppleSignIn}
    />
  );
}

AppleButton.propTypes = {
  style: ViewPropTypes.style,
  handleAppleSubmit: PropTypes.func.isRequired,
};

AppleButton.defaultProps = {
  style: null,
};

export default AppleButton;
