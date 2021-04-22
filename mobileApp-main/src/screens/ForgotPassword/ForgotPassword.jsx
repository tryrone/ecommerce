import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';

import AuthHeader from 'components/AuthHeader';
import HeaderWithBackArrow from 'components/HeaderWithBackArrow';
import Button from 'components/Button';
import PhoneNumberInput from 'components/PhoneNumberInput';
import AuthHeaderLayout from 'components/AuthHeaderLayout';

import usePhoneNumber from 'hooks/usePhoneNumber';
import * as userApi from 'resources/user/user.api';

import styles from './ForgotPassword.styles';

function ForgotPassword({ navigation }) {
  const handleSubmit = useCallback(
    async (phoneNumber) => {
      try {
        await userApi.forgotPassword(phoneNumber);
        navigation.navigate('ResetCode', { phoneNumber });
      } catch (e) {
        const errorMessage = e.data?.message || 'Something went wrong';
        Alert.alert('', errorMessage);
      }
    },
    [navigation],
  );

  const onBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const {
    onChangePhone,
    onChangeFormattedPhone,
    phoneNumberInputRef,
    onContinue,
    phoneError,
  } = usePhoneNumber(handleSubmit);

  return (
    <View style={styles.screen}>
      <AuthHeaderLayout>
        <HeaderWithBackArrow onBackNavigation={onBackNavigation}>
          <AuthHeader
            withLogo
            title="Forgot Password"
            subtitle="Enter your phone number to proceed with the reset"
          />
        </HeaderWithBackArrow>
      </AuthHeaderLayout>
      <View style={styles.inputWrapper}>
        <PhoneNumberInput
          inputRef={phoneNumberInputRef}
          onChangePhone={onChangePhone}
          onChangeFormattedPhone={onChangeFormattedPhone}
          error={phoneError}
          text="Phone number"
        />
      </View>
      <View style={styles.buttonContinueWrapper}>
        <Button title="Continue" disabled={!!phoneError} onPress={onContinue} />
      </View>
    </View>
  );
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default ForgotPassword;
