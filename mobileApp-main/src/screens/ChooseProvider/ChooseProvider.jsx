import React, { useState, useCallback, useMemo } from 'react';
import { View, SafeAreaView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import PhoneNumberInput from 'components/PhoneNumberInput';
import PhoneCard from 'components/PhoneCard';
import Button from 'components/Button';
import Text from 'components/Text';
import MainHeader from 'components/MainHeader';
import DismissKeyboard from 'components/DismissKeyboard';

import {
  MOBILE_MONEY_FLOW,
  PHONE_OPERATORS,
  PROVIDERS,
} from 'helpers/constants';
import { getPhoneOperatorIcon } from 'helpers/phoneOperator.helper';
import { addPhoneNumber } from 'resources/wallet/wallet.actions';
import usePhoneNumber from 'hooks/usePhoneNumber';

import styles from './ChooseProvider.styles';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 30 : 0;

function ChooseProvider({ navigation, route }) {
  const [phoneOperator, setPhoneOperator] = useState(PHONE_OPERATORS.ORANGE);
  const { phoneflow } = route.params;
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (phoneNumber) => {
      await dispatch(
        addPhoneNumber(
          {
            phoneNumber,
            phoneOperator,
          },
          phoneflow,
        ),
      );

      switch (phoneflow) {
        case MOBILE_MONEY_FLOW.DEPOSIT:
          return navigation.navigate('ConfirmMobileDeposit');
        case MOBILE_MONEY_FLOW.SEND:
          return navigation.navigate('SendMobileMoney');
        case MOBILE_MONEY_FLOW.AIRTIME:
          return navigation.navigate('BuyAirtime');
        case MOBILE_MONEY_FLOW.WITHDRAWAL:
          return navigation.navigate('WithdrawalMobileMoney');
        default:
          return navigation.navigate('ConfirmMobileDeposit');
      }
    },
    [navigation, phoneOperator, phoneflow],
  );

  const {
    onChangePhone,
    onChangeFormattedPhone,
    phoneNumberInputRef,
    onContinue,
    phoneError,
    phoneNumber,
  } = usePhoneNumber(handleSubmit);

  const providers = useMemo(() => {
    if (phoneflow === MOBILE_MONEY_FLOW.AIRTIME)
      return PROVIDERS.MOBILE_PROVIDERS_AIRTIME;

    return PROVIDERS.MOBILE_PROVIDERS_SEND_WITHDRAWAL;
  }, [phoneflow]);

  const isButtonDisabled = useMemo(
    () => !!phoneError || !phoneOperator || !phoneNumber,
    [phoneError, phoneOperator, phoneNumber],
  );

  const preposition = useMemo(() => {
    if (phoneflow === MOBILE_MONEY_FLOW.SEND) {
      return 'to';
    }
    return 'from';
  }, [phoneflow]);

  return (
    <DismissKeyboard keyboardAvoidingViewProps={{ keyboardVerticalOffset }}>
      <MainHeader title="Add New Number" subTitle="Choose your provider" />
      <SafeAreaView style={styles.screen}>
        <View>
          <View
            style={[
              styles.cardsContainer,
              phoneflow === MOBILE_MONEY_FLOW.AIRTIME &&
                styles.airtimeContainer,
            ]}
          >
            {providers.map((key) => (
              <PhoneCard
                key={PHONE_OPERATORS[key]}
                providerName={PHONE_OPERATORS[key]}
                providerLogo={getPhoneOperatorIcon(PHONE_OPERATORS[key])}
                isChoosed={phoneOperator === PHONE_OPERATORS[key]}
                chooseMobileOperator={setPhoneOperator}
              />
            ))}
          </View>
          <Text style={styles.text}>
            Choose the number you will deposit {preposition}
          </Text>
          <View style={styles.input}>
            <PhoneNumberInput
              inputRef={phoneNumberInputRef}
              onChangePhone={onChangePhone}
              onChangeFormattedPhone={onChangeFormattedPhone}
              error={phoneError}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            style={styles.buttonConfirm}
            title="Continue"
            disabled={isButtonDisabled}
            onPress={onContinue}
          />
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

ChooseProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      phoneflow: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ChooseProvider;
