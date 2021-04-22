import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';

import {
  getPhoneOperatorIcon,
  getWithdrawalMinimumAmount,
} from 'helpers/phoneOperator.helper';
import { getSelectedPhoneNumber } from 'resources/wallet/wallet.selectors';
import amplitudeInstance from 'helpers/amplitude.helper';
import { getCorrectOperatorForTransaction } from 'helpers/utils.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';
import { getUserId } from 'resources/user/user.selectors';
import { withdrawalMobileMoney } from 'resources/transaction/transaction.api';

import styles from './WithdrawalMobileMoney.styles';

function WithdrawalMobileMoney({ navigation }) {
  const { phoneOperator, phoneNumber } = useSelector(getSelectedPhoneNumber);
  const userId = useSelector(getUserId);
  const correctPhoneOperatorCurrentFlow = getCorrectOperatorForTransaction(
    phoneOperator,
  );

  const MobileOperatorIcon = getPhoneOperatorIcon(
    correctPhoneOperatorCurrentFlow,
  );
  const minimumAmount = getWithdrawalMinimumAmount(
    correctPhoneOperatorCurrentFlow,
  );

  const disableConfirmButton = useCallback(
    (enteredAmount) => {
      return enteredAmount < minimumAmount;
    },
    [minimumAmount],
  );

  const handlePressConfirm = useCallback(
    async (amount, formattedAmount) => {
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SET_AMOUNT, {
        Type: 'Withdrawal - Mobile Money',
        Amount: amount,
      });

      try {
        await withdrawalMobileMoney({
          amount,
          userId,
          phoneNumber,
          provider: correctPhoneOperatorCurrentFlow,
        });

        amplitudeInstance.logEvent(
          ANALYTICS_EVENTS.TRANSFER_COMPLETE_TRANSACTION,
          {
            Type: 'Withdrawal - Mobile Money',
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
                    You just withdrawn{' '}
                    <Text style={styles.amountMoney}>₣ {formattedAmount}</Text>{' '}
                    to {phoneNumber}.
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
      title="Withdrawal"
      subTitle="Enter amount"
      message={`Minimum amount for withdrawal is ${minimumAmount} ₣`}
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

WithdrawalMobileMoney.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default WithdrawalMobileMoney;
