import React, { useCallback } from 'react';
import { Alert, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';
import { processMoney, getInitials } from 'helpers/utils.helper';
import { transfer } from 'resources/transaction/transaction.api';
import * as userSelectors from 'resources/user/user.selectors';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';
import LeftIcon from 'components/Contact/LeftIcon';

import styles from './SendDuniaMoney.styles';

function SendDuniaMoney({ navigation, route }) {
  const {
    phoneContactName,
    duniapayName,
    recipientId,
    onGoBackQrCodeScan,
  } = route.params;

  const userData = useSelector(userSelectors.getUserData);

  const handlePressConfirm = useCallback(
    async (formattedValue) => {
      if (formattedValue > userData.availableBalance) {
        Alert.alert(
          '',
          'You want to transfer more money than you currently have. Please enter a smaller amount of money',
        );
      } else if (recipientId === userData._id) {
        Alert.alert('', 'You can`t transfer money to yourself');
      } else {
        amplitudeInstance.logEvent(ANALYTICS_EVENTS.PAYMENT_SET_AMOUNT, {
          Type: 'P2P',
          Amount: formattedValue,
        });

        await transfer({ amount: formattedValue, recipient: recipientId });

        amplitudeInstance.logEvent(
          ANALYTICS_EVENTS.PAYMENT_COMPLETE_TRANSACTION,
          {
            Type: 'P2P',
            'Total amount': formattedValue,
          },
        );

        navigation.navigate('Congratulations', {
          title: 'Congratulations!',
          buttonName: 'Back to Wallet',
          screenStyle: styles.successScreen,
          onContinuePress: () => navigation.navigate('Homepage'),
          subTitle: (
            <Text>
              You just sent{' '}
              <Text style={styles.amountMoney}>
                ₣ {processMoney(formattedValue.toString())}
              </Text>{' '}
              to {phoneContactName}.
            </Text>
          ),
        });
      }
    },
    [navigation],
  );

  return (
    <ConfirmDeposit
      title="Send Money"
      subTitle="Enter amount"
      navigation={navigation}
      handleConfirm={handlePressConfirm}
      leftIcon={<LeftIcon icon={getInitials(phoneContactName)} />}
      handleGoBack={onGoBackQrCodeScan}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{phoneContactName}</Text>
        <Text style={styles.cardSubTitle}>{duniapayName}</Text>
      </View>
    </ConfirmDeposit>
  );
}

SendDuniaMoney.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      phoneContactName: PropTypes.string.isRequired,
      duniapayName: PropTypes.string.isRequired,
      recipientId: PropTypes.string.isRequired,
      onGoBackQrCodeScan: PropTypes.func,
    }),
  }).isRequired,
};

export default SendDuniaMoney;
