import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

import Button from 'components/Button';
import Input from 'components/Input';
import * as userApi from 'resources/user/user.api';

import SwapIcon from 'assets/icons/swap.svg';
import MessageIcon from 'assets/icons/message.svg';

import images from 'themes/images';

import styles from './VerifyCode.styles';

function VerifyCode({ handleSubmit, phoneNumber }) {
  const [code, setCode] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const onCodeChange = useCallback(
    (text) => {
      setCode(text.replace(/\D*/g, ''));
    },
    [setCode],
  );

  const onContinue = useCallback(async () => {
    if (!code) {
      setErrorMessage('Confirmation code is required');
      return;
    }

    if (code.length !== 6) {
      setErrorMessage('Confirmation code should contain 6 digits');
      return;
    }

    setErrorMessage();
    try {
      const { verificationToken } = await userApi.verifyCode({
        phoneNumber,
        code,
      });
      handleSubmit(verificationToken);
    } catch (error) {
      const {
        data: { code: codeError },
      } = error;
      setErrorMessage(codeError);
    }
  }, [code, handleSubmit, phoneNumber, setErrorMessage]);

  useEffect(() => {
    const codeRegex = /Your one time code is: ([\d]{6})/;

    const subscription = SmsListener.addListener((message) => {
      const { body } = message;
      // if (originatingAddress !== '+1phone_which_sends_codes') return;
      if (!codeRegex.test(body)) return;
      const [, receivedCode] = body.match(codeRegex);
      setCode(receivedCode);
      onContinue();
    });

    return () => subscription.remove();
  }, [onContinue]);

  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.imagesContainer}>
          <Image source={images.duniaLogo} />
          <SwapIcon style={styles.swapIcon} />
          <MessageIcon />
        </View>
        <Input
          label="Code"
          value={code}
          onChangeText={onCodeChange}
          textContentType="oneTimeCode"
          autoFocus
          maxLength={6}
          placeholder="******"
          keyboardType="numeric"
          errorMessage={errorMessage}
        />
      </View>
      <View style={styles.continueButtonWrapper}>
        <Button title="Continue" onPress={onContinue} />
      </View>
    </View>
  );
}

VerifyCode.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default VerifyCode;
