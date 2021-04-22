import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

import * as userActions from 'resources/user/user.actions';
import { signUpFacebook, signUpGoogle, signUpApple } from 'resources/user/user.api';
import * as userSelectors from 'resources/user/user.selectors';
import Text from 'components/Text';

import * as constants from 'helpers/constants';

import FacebookButton from './components/FacebookButton';
import GoogleButton from './components/GoogleButton';
import AppleButton from './components/AppleButton';

import styles from './SocialButtons.styles';

function SocialButtons({ title, verificationToken, type }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const storedPin = useSelector(userSelectors.getPinCode);

  const handleGoogleSignIn = useCallback(
    async (userInfo) => {
      const { serverAuthCode } = userInfo;

      if (type === constants.AUTH.SIGN_UP) {
        const { sub, email } = await signUpGoogle({
          googleAccessToken: serverAuthCode,
          verificationToken,
        });

        navigation.navigate('CompleteSocialSignUp', {
          google: sub,
          email,
          verificationToken,
        });
        return;
      }
      if (type === constants.AUTH.SIGN_IN) {
        await dispatch(userActions.signInGoogle(serverAuthCode));

        if (storedPin) {
          dispatch(userActions.setUserAuthenticated());
          return;
        }

        navigation.navigate('PinCodeChoose', {
          withLogo: true,
          showProgressBar: false,
          pinFlow: constants.AUTH.SIGN_IN,
        });
      }
    },
    [type],
  );

  const handleFacebookSubmit = useCallback(
    async (facebookAccessToken) => {
      if (type === constants.AUTH.SIGN_UP) {
        const { id, email } = await signUpFacebook({
          facebookAccessToken,
          verificationToken,
        });
        navigation.navigate('CompleteSocialSignUp', {
          facebook: id,
          email,
          verificationToken,
        });
        return;
      }
      if (type === constants.AUTH.SIGN_IN) {
        await dispatch(userActions.signInFacebook({ facebookAccessToken }));

        if (storedPin) {
          dispatch(userActions.setUserAuthenticated());
          return;
        }

        navigation.navigate('PinCodeChoose', {
          withLogo: true,
          showProgressBar: false,
          pinFlow: constants.AUTH.SIGN_IN,
        });
      }
    },
    [type, verificationToken, navigation],
  );

  const handleAppleSubmit = useCallback(async (identityToken) => {
    if (type === constants.AUTH.SIGN_UP) {
      const { sub, email } = await signUpApple({
        appleIdentityToken: identityToken,
        verificationToken,
      });
      navigation.navigate('CompleteSocialSignUp', {
        apple: sub,
        email,
        verificationToken,
      });
      return;
    }
    if (type === constants.AUTH.SIGN_IN) {
      await dispatch(userActions.signInApple(identityToken));

      if (storedPin) {
        dispatch(userActions.setUserAuthenticated());
        return;
      }

      navigation.navigate('PinCodeChoose', {
        withLogo: true,
        showProgressBar: false,
        pinFlow: constants.AUTH.SIGN_IN,
      });
    }
  }, []);

  return (
    <View style={styles.socialWrapper}>
      <Text style={styles.socialText}>{title}</Text>
      <View style={styles.socialButtonsWrapper}>
        <GoogleButton
          style={styles.socialButton}
          handleGoogleSubmit={handleGoogleSignIn}
        />
        <FacebookButton
          style={Platform.OS === 'ios' && styles.socialButton}
          handleFacebookSubmit={handleFacebookSubmit}
        />
        {Platform.OS === 'ios' && (
          <AppleButton handleAppleSubmit={handleAppleSubmit} />
        )}
      </View>
    </View>
  );
}

SocialButtons.propTypes = {
  title: PropTypes.string.isRequired,
  verificationToken: PropTypes.string,
  type: PropTypes.string.isRequired,
};

SocialButtons.defaultProps = {
  verificationToken: '',
};

export default SocialButtons;
