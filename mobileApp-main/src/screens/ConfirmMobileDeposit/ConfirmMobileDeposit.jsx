import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';
import FullScreenLoader from 'components/FullScreenLoader';

import { getCorrectOperatorForTransaction } from 'helpers/utils.helper';
import { getPhoneOperatorIcon } from 'helpers/phoneOperator.helper';
import { getSelectedPhoneNumber } from 'resources/wallet/wallet.selectors';
import { mobileDeposit } from 'resources/transaction/transaction.api';
import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS, PHONE_OPERATORS } from 'helpers/constants';
import { getUserId } from 'resources/user/user.selectors';

import styles from './ConfirmMobileDeposit.styles';

function ConfirmMobileDeposit({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const { phoneOperator, phoneNumber } = useSelector(getSelectedPhoneNumber);
  const userId = useSelector(getUserId);

  const correctPhoneOperatorCurrentFlow = getCorrectOperatorForTransaction(
    phoneOperator,
  );

  const handleMoovDeposit = useCallback(async (amount, formattedAmount) => {
    amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SET_AMOUNT, {
      Type: 'Mobile money',
      Amount: amount,
    });

    try {
      await mobileDeposit({
        userId,
        amount,
        phoneNumber,
        provider: correctPhoneOperatorCurrentFlow,
      });

      amplitudeInstance.logEvent(
        ANALYTICS_EVENTS.TRANSFER_COMPLETE_TRANSACTION,
        {
          Type: 'Mobile money',
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
                  You just deposited{' '}
                  <Text style={styles.amountMoney}>₣ {formattedAmount}</Text> to
                  DuniaPay Wallet. Follow provider instructions to complete{' '}
                  deposit.
                </Text>
              ),
            },
          },
        ],
      });
    } catch (e) {
      setLoading(false);
      Alert.alert('Transaction Failed', e.data?.message || '');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    }
  }, []);

  const handlePressConfirm = useCallback(
    async (amount, formattedAmount) => {
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SET_AMOUNT, {
        Type: 'Mobile money',
        Amount: amount,
      });

      navigation.navigate('ConfirmMobileMoneyCode', {
        userId,
        amount,
        formattedAmount,
        title: 'Mobile Money Deposit',
        analyticEvent: ANALYTICS_EVENTS.TRANSFER_COMPLETE_TRANSACTION,
      });
    },
    [navigation, userId],
  );
  const MobileOperatorIcon = getPhoneOperatorIcon(
    correctPhoneOperatorCurrentFlow,
  );

  return (
    <ConfirmDeposit
      title="Mobile Money Deposit"
      subTitle="Enter amount"
      navigation={navigation}
      leftIcon={<MobileOperatorIcon />}
      handleConfirm={
        correctPhoneOperatorCurrentFlow === PHONE_OPERATORS.MOOV
          ? handleMoovDeposit
          : handlePressConfirm
      }
    >
      {isLoading && <FullScreenLoader />}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Phone Number</Text>
        <Text style={styles.cardSubTitle}>{phoneNumber}</Text>
      </View>
    </ConfirmDeposit>
  );
}

ConfirmMobileDeposit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
};

export default ConfirmMobileDeposit;
