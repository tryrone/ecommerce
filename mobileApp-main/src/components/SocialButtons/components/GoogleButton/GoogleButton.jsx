import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert, ViewPropTypes } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import Button from 'components/Button';
import * as userActions from 'resources/user/user.actions';
import config from 'resources/config';
import GoogleIcon from 'assets/icons/google.svg';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  iosClientId: config.googleAuthIosClientId,
  webClientId: config.googleAuthWebClientId,
  offlineAccess: true,
});

function GoogleButton({ style, handleGoogleSubmit }) {
  const handlePress = useCallback(async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      await handleGoogleSubmit(userInfo);
    } catch (e) {
      const errorMessage = e.data?.message || 'Something went wrong';
      Alert.alert('', errorMessage);
      userActions.logOut();
    }
  }, [handleGoogleSubmit]);

  return (
    <Button
      style={style}
      icon={GoogleIcon}
      type="social"
      onPress={handlePress}
    />
  );
}

GoogleButton.propTypes = {
  style: ViewPropTypes.style,
  handleGoogleSubmit: PropTypes.func.isRequired,
};

GoogleButton.defaultProps = {
  style: null,
};

export default GoogleButton;
