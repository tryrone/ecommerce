import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Intercom from 'react-native-intercom';

import PinCode from 'components/PinCode';
import Text from 'components/Text';
import ButtonLink from 'components/ButtonLink';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import AuthHeader from 'components/AuthHeader';
import * as userActions from 'resources/user/user.actions';
import * as userSelectors from 'resources/user/user.selectors';
import * as storage from 'helpers/storage';

import TouchIdIcon from 'assets/icons/touchId.svg';

import styles from './PinCodeEnter.styles';

function PinCodeEnter({ navigation }) {
  const storedPin = useSelector(userSelectors.getPinCode);
  const pinCodeEnterAttempts = useSelector(userSelectors.getPinCodeAttempts);

  const dispatch = useDispatch();

  const [isTouchId, setTouchId] = useState(false);
  const [pinCodeAttempts, setPinCodeAttempts] = useState(pinCodeEnterAttempts);

  useEffect(() => {
    const init = async () => {
      try {
        await FingerprintScanner.isSensorAvailable();
        const stateTouchId = await storage.getTouchID();
        setTouchId(Boolean(stateTouchId));
      } catch (e) {
        setTouchId(false);
        storage.removeTouchID();
      }
    };
    init();
  }, [setTouchId]);

  const handlePinEnter = useCallback(() => {
    dispatch(userActions.enterPinCode());
  }, []);

  const validatePinCode = useCallback(
    (pinValue) => {
      return storedPin === pinValue;
    },
    [storedPin],
  );

  const navigateToLogin = useCallback(() => {
    Intercom.logout();
    navigation.navigate('SignIn');
  }, [navigation]);

  const numberAttempts = useMemo(() => {
    return pinCodeAttempts === 1 ? 'attempt' : 'attempts';
  }, [pinCodeAttempts]);

  const navigateToBiometricAuth = useCallback(async () => {
    try {
      await FingerprintScanner.authenticate({
        description: 'Scan your biometric data on the device to continue',
      });
      dispatch(userActions.biometricAuth());
    } catch (error) {
      Alert.alert(error.name, error.message);
      navigation.navigate('PinCodeEnter');
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthHeaderLayout>
        <AuthHeader
          title="Welcome back!"
          subtitle="Enter your PIN to sign in"
          withLogo
        />
      </AuthHeaderLayout>
      <View style={styles.pinCodeWrapper}>
        <PinCode
          title="Welcome back!"
          subtitle="Enter your PIN to sign in"
          onFulfill={handlePinEnter}
          validatePinCode={validatePinCode}
          setPinCodeAttempts={setPinCodeAttempts}
          withLogo
        />
      </View>
      {pinCodeAttempts < 3 && (
        <Text style={styles.warningText}>
          You have {pinCodeAttempts} {numberAttempts} to log in with your pin
          code.
        </Text>
      )}
      <View style={styles.footer}>
        <Text style={styles.forgotText}>Forgot pin?</Text>
        <ButtonLink
          title="Log in with password"
          textStyle={styles.link}
          onPress={navigateToLogin}
        />
      </View>
      {isTouchId && (
        <View style={styles.touchIdLink}>
          <TouchIdIcon />
          <ButtonLink
            title="Log in with Touch ID/Face ID"
            textStyle={styles.text}
            onPress={navigateToBiometricAuth}
          />
        </View>
      )}
    </View>
  );
}

PinCodeEnter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default PinCodeEnter;
