import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Button from 'components/Button';
import MainHeader from 'components/MainHeader';
import Card from 'components/Card';
import FullScreenLoader from 'components/FullScreenLoader';
import CardRightIcon from 'components/CardRightIcon';

import { getKeyboardVerticalOffset, processMoney } from 'helpers/utils.helper';
import { processCryptoFiatMoney } from 'helpers/currency.helper';

import styles from './ConfirmDeposit.styles';

function ConfirmDeposit({
  children,
  title,
  subTitle,
  message,
  navigation,
  leftIcon,
  handleConfirm,
  disableConfirm,
  currency,
  handleGoBack,
}) {
  const [isDisabled, setDisabled] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [amountMoney, onChangeAmountMoney] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef();
  const numberSymbolsInString = 7;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleBack = useCallback(() => {
    handleGoBack();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, handleGoBack]);

  const onConfirm = useCallback(async () => {
    setSubmitting(true);
    let validAmount = amountMoney;
    if (currency === 'F') {
      validAmount = parseInt(amountMoney.replace(/\D+/g, ''), 10);
    }
    await handleConfirm(validAmount, amountMoney);
    setSubmitting(false);
  }, [amountMoney]);

  const handleChangeText = useCallback(
    (text) => {
      if (text.length < numberSymbolsInString) {
        setError('');
        let processedMoney = 0;
        if (currency === 'F') {
          processedMoney = processMoney(text);
        } else {
          processedMoney = processCryptoFiatMoney(text);
        }
        onChangeAmountMoney(processedMoney);
        return processedMoney === '0' || disableConfirm(processedMoney)
          ? setDisabled(true)
          : setDisabled(!processedMoney);
      }
      return setError(
        'You can not enter sum that contains more than 5 numbers',
      );
    },
    [onChangeAmountMoney, setDisabled, setError],
  );

  return (
    <>
      {isSubmitting && <FullScreenLoader />}
      <SafeAreaView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          style={styles.container}
          keyboardVerticalOffset={getKeyboardVerticalOffset()}
        >
          <MainHeader
            title={title}
            subTitle={subTitle}
            handleLeftIconClick={handleBack}
          />
          <View style={styles.contentWrapper}>
            <View style={styles.wrapperInput}>
              <Text style={[styles.inputText, styles.currency]}>
                {currency}
              </Text>
              <TextInput
                multiline={false}
                underlineColorAndroid="transparent"
                ref={inputRef}
                onChangeText={handleChangeText}
                value={amountMoney}
                blurOnSubmit={false}
                style={styles.inputText}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            {Boolean(error) && <Text style={styles.error}>{error}</Text>}
            <Text style={styles.subTitle}>
              Money for transfer: {currency} {amountMoney}
            </Text>
            {message && <Text style={styles.message}>{message}</Text>}
            <Card
              leftIcon={leftIcon}
              rightIcon={<CardRightIcon title="Change" />}
              onCardClick={handleBack}
              cardStyle={styles.card}
              rightIconClick={handleBack}
              textStyle={styles.textStyle}
            >
              {children}
            </Card>
            <Button
              onPress={onConfirm}
              style={styles.buttonConfirm}
              disabled={isDisabled}
              title="Confirm"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

ConfirmDeposit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    canGoBack: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  message: PropTypes.string,
  leftIcon: PropTypes.element,
  handleConfirm: PropTypes.func,
  disableConfirm: PropTypes.func,
  currency: PropTypes.string,
  handleGoBack: PropTypes.func,
};

ConfirmDeposit.defaultProps = {
  currency: 'F',
  message: null,
  leftIcon: null,
  handleConfirm: () => {},
  disableConfirm: () => false,
  handleGoBack: () => {},
};

export default ConfirmDeposit;
