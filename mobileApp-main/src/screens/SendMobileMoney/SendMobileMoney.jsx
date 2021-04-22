import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';

import { getSelectedPhoneNumber } from 'resources/wallet/wallet.selectors';
import { getUserId } from 'resources/user/user.selectors';
import { withdrawalMobileMoney } from 'resources/transaction/transaction.api';

import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';
import { getPhoneOperatorIcon } from 'helpers/phoneOperator.helper';

import styles from './SendMobileMoney.styles';

function SendMobileMoney({ navigation }) {
  const { phoneOperator, phoneNumber } = useSelector(getSelectedPhoneNumber);
  const userId = useSelector(getUserId);

  const handlePressConfirm = useCallback(
    async (amount, formattedAmount) => {
      try {
        amplitudeInstance.logEvent(ANALYTICS_EVENTS.PAYMENT_SET_AMOUNT, {
          Type: 'Mobile money',
          Amount: amount,
        });

        await withdrawalMobileMoney({
          userId,
          phoneNumber,
          provider: phoneOperator,
          amount,
        });

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
                    You just sent{' '}
                    <Text style={styles.amountMoney}>₣ {formattedAmount}</Text>{' '}
                    to {phoneNumber}.
                  </Text>
                ),
              },
            },
          ],
        });
      } catch (e) {
        const errorMessage = e?.data.message || 'Transaction Failed';
        Alert.alert('', errorMessage);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      }
    },
    [navigation, userId],
  );

  const MobileOperatorIcon = getPhoneOperatorIcon(phoneOperator);

  return (
    <ConfirmDeposit
      title="Send Money"
      subTitle="Enter amount"
      navigation={navigation}
      handleConfirm={handlePressConfirm}
      leftIcon={<MobileOperatorIcon />}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>Phone Number</Text>
        <Text style={styles.cardSubTitle}>{phoneNumber}</Text>
      </View>
    </ConfirmDeposit>
  );
}

SendMobileMoney.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      phoneContactName: PropTypes.string.isRequired,
      phoneContactPhone: PropTypes.string.isRequired,
      recipientId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default SendMobileMoney;
