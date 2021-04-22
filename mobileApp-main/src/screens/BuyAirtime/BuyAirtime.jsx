import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';

import {
  getPhoneOperatorIcon,
  getAirtimeMinimumAmount,
} from 'helpers/phoneOperator.helper';
import { getSelectedPhoneNumber } from 'resources/wallet/wallet.selectors';
import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS, MOBILE_MONEY_FLOW } from 'helpers/constants';
import {
  getCorrectOperatorForTransaction,
  getCorrectOperatorCurrentFlow,
} from 'helpers/utils.helper';
import { getUserId } from 'resources/user/user.selectors';
import { buyAirtime } from 'resources/transaction/transaction.api';

import styles from './BuyAirtime.styles';

function BuyAirtime({ navigation }) {
  const { phoneOperator, phoneNumber } = useSelector(getSelectedPhoneNumber);
  const userId = useSelector(getUserId);
  const correctOperatorCurrentFlow = getCorrectOperatorCurrentFlow(
    phoneOperator,
    MOBILE_MONEY_FLOW.AIRTIME,
  );

  const MobileOperatorIcon = getPhoneOperatorIcon(correctOperatorCurrentFlow);
  const minimumAmount = getAirtimeMinimumAmount(correctOperatorCurrentFlow);

  const disableConfirmButton = useCallback(
    (enteredAmount) => {
      return enteredAmount < minimumAmount;
    },
    [minimumAmount],
  );

  const handlePressConfirm = useCallback(
    async (amount, formattedAmount) => {
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SET_AMOUNT, {
        Type: 'AirTime',
        Amount: amount,
      });
      const correctPhoneOperator = getCorrectOperatorForTransaction(
        phoneOperator,
      );

      try {
        await buyAirtime({
          amount,
          userId,
          phoneNumber,
          provider: correctPhoneOperator,
        });

        amplitudeInstance.logEvent(
          ANALYTICS_EVENTS.TRANSFER_COMPLETE_TRANSACTION,
          {
            Type: 'AirTime',
            'Total amount': amount,
          },
        );

        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Congratulations',
              params: {
                title: 'Congratulations!',
                buttonName: 'Back to Wallet',
                screenStyle: styles.successScreen,
                onContinuePress: () =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Dashboard' }],
                  }),
                subTitle: (
                  <Text>
                    You just bought{' '}
                    <Text style={styles.amountMoney}>₣ {formattedAmount}</Text>{' '}
                    for {phoneNumber}.
                  </Text>
                ),
              },
            },
          ],
        });
      } catch (e) {
        const error = e.data?.message || '';

        Alert.alert('Transaction Failed', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }
    },
    [navigation, userId],
  );

  return (
    <ConfirmDeposit
      title="AirTime"
      subTitle="Enter amount"
      message={`Minimum amount for airtime is ${minimumAmount} ₣`}
      navigation={navigation}
      leftIcon={<MobileOperatorIcon />}
      handleConfirm={handlePressConfirm}
      disableConfirm={disableConfirmButton}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Phone Number</Text>
        <Text style={styles.cardSubTitle}>{phoneNumber}</Text>
      </View>
    </ConfirmDeposit>
  );
}

BuyAirtime.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default BuyAirtime;
