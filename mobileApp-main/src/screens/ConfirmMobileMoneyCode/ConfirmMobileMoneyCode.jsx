import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Text from 'components/Text';
import MainHeader from 'components/MainHeader';
import FullScreenLoader from 'components/FullScreenLoader';

import { mobileDeposit } from 'resources/transaction/transaction.api';
import { getSelectedPhoneNumber } from 'resources/wallet/wallet.selectors';
import { processMoney } from 'helpers/utils.helper';
import amplitudeInstance from 'helpers/amplitude.helper';
import PinInput from 'components/PinInput';

import styles from './ConfirmMobileMoneyCode.styles';

function ConfirmMobileMoneyCode({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const { phoneOperator, phoneNumber } = useSelector(getSelectedPhoneNumber);
  const {
    userId,
    amount,
    formattedAmount,
    title,
    analyticEvent,
  } = route.params;

  const handleFulfillment = useCallback(
    async (otp) => {
      setLoading(true);

      try {
        await mobileDeposit({
          userId,
          amount,
          phoneNumber,
          provider: phoneOperator,
          otp,
        });

        amplitudeInstance.logEvent(analyticEvent, {
          Type: 'Mobile money',
          'Total amount': amount,
        });

        setLoading(false);

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
                    <Text style={styles.amountMoney}>
                      ₣ {processMoney(formattedAmount)}
                    </Text>{' '}
                    to DuniaPay Wallet.
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
    },
    [navigation, phoneNumber, phoneOperator, formattedAmount, amount],
  );

  return (
    <SafeAreaView>
      {isLoading && <FullScreenLoader />}
      <MainHeader
        title={title}
        subTitle={`Enter the 6 digit code sent to you at ${phoneNumber} to confirm your payment`}
      />
      <View style={styles.wrapper}>
        <PinInput
          codeLength={6}
          cellSpacing={10}
          cellSize={50}
          pinCode={value}
          onPinChange={setValue}
          onFulfill={handleFulfillment}
        />
      </View>
    </SafeAreaView>
  );
}

ConfirmMobileMoneyCode.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      formattedAmount: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      analyticEvent: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ConfirmMobileMoneyCode;
