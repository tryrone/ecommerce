import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as userActions from 'resources/user/user.actions';
import { AUTH, PIN_STATUSES, ANALYTICS_EVENTS } from 'helpers/constants';
import { setItem } from 'helpers/storage';
import amplitudeInstance from 'helpers/amplitude.helper';
import ProgressBar from 'components/ProgressBar';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import HeaderWithBackArrow from 'components/HeaderWithBackArrow';
import AuthHeader from 'components/AuthHeader';
import PinCodeContainer from 'components/PinCodeContainer';

import styles from './PinCodeChoose.styles';

function PinCodeChoose({ navigation, route }) {
  const dispatch = useDispatch();

  const numberPinEnter = 3;

  const [status, setStatus] = useState(PIN_STATUSES.CHOOSE);

  const { withLogo, showProgressBar, pinFlow } = route.params;

  const headerTitle = useMemo(() => {
    return status === PIN_STATUSES.CHOOSE
      ? 'Create your PIN'
      : 'Repeat your PIN';
  }, [status]);

  const headerSubTitle = useMemo(() => {
    return status === PIN_STATUSES.CHOOSE
      ? 'Choose a 4-digit PIN to protect your account'
      : 'Repeat a 4-digit PIN to protect your account';
  }, [status]);

  const onConfirm = () => {
    if (pinFlow === AUTH.SIGN_UP) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AccountCreationCongratulations' }],
      });
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.SIGNUP_SET_PIN);
    } else if (pinFlow === AUTH.SIGN_IN) {
      dispatch(userActions.setUserAuthenticated());
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.SET_PIN);
    }
    setItem('numberPinEnter', numberPinEnter);
  };

  const onBackNavigation = useCallback(() => {
    if (status === PIN_STATUSES.CHOOSE) navigation.goBack();
    else setStatus(PIN_STATUSES.CHOOSE);
  }, [navigation, setStatus, status]);

  return (
    <View style={styles.container}>
      <AuthHeaderLayout style={styles.authHeaderLayout}>
        <HeaderWithBackArrow
          onBackNavigation={onBackNavigation}
          style={showProgressBar && styles.header}
        >
          {showProgressBar && <ProgressBar currentStep={3} totalSteps={3} />}
        </HeaderWithBackArrow>
        <View style={styles.authHeaderContainer}>
          <AuthHeader
            title={headerTitle}
            subtitle={headerSubTitle}
            withLogo={withLogo}
          />
        </View>
      </AuthHeaderLayout>
      <View style={styles.pinCodeContainer}>
        <PinCodeContainer
          status={status}
          setStatus={setStatus}
          onConfirm={onConfirm}
          wrapperStyle={styles.pinWrapper}
        />
      </View>
    </View>
  );
}

PinCodeChoose.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      pinFlow: PropTypes.string,
      withLogo: PropTypes.bool,
      showProgressBar: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default PinCodeChoose;
