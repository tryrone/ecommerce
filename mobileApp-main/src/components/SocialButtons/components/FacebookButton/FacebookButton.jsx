import React, { useCallback } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Alert, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import * as userActions from 'resources/user/user.actions';

import FacebookIcon from 'assets/icons/facebook.svg';

function FacebookButton({ handleFacebookSubmit, style }) {
  const handleFacebookSignIn = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (!result || result.isCancelled) return;

      const { accessToken } = await AccessToken.getCurrentAccessToken();
      await handleFacebookSubmit(accessToken);
    } catch (e) {
      const errorMessage = e.data.message || 'Something went wrong';
      Alert.alert('', errorMessage);
      userActions.logOut();
    }
  }, [handleFacebookSubmit]);

  return (
    <Button
      icon={FacebookIcon}
      type="social"
      style={style}
      onPress={handleFacebookSignIn}
    />
  );
}

FacebookButton.propTypes = {
  style: ViewPropTypes.style,
  handleFacebookSubmit: PropTypes.func.isRequired,
};

FacebookButton.defaultProps = {
  style: null,
};

export default FacebookButton;
