import React, { useCallback, useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import {
  getCurrencySymbol,
  getRawNumberString,
  processCryptoFiatMoney,
  CURRENCIES,
} from 'helpers/currency.helper';
import * as cryptoSelectors from 'resources/crypto/crypto.selectors';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';
import LeftIcon from 'components/Contact/LeftIcon';
import FullScreenLoader from 'components/FullScreenLoader';

import { sendCrypto } from 'resources/crypto/crypto.api';

import styles from './SendCryptoMoney.styles';

function SendCryptoMoney({ navigation, route }) {
  const { depositAddress, crypto, onGoBackQrCodeScan } = route.params;

  const [isLoading, setLoading] = useState(false);

  const cryptocurrency = getCurrencySymbol(crypto).sign;
  const headerTitle = `Send ${crypto}`;
  const cryptoData = useSelector(cryptoSelectors.getCryptoInfo);

  const getCryptoBalance = () => {
    if (crypto === CURRENCIES.CRYPTO.BITCOIN) {
      return cryptoData.Bitcoin.cryptoBalance;
    }
    if (crypto === CURRENCIES.CRYPTO.CELO) {
      return cryptoData.Celo.cryptoBalance;
    }
    return cryptoData.Ethereum.cryptoBalance;
  };

  const handlePressConfirm = useCallback(
    async (formattedValue) => {
      const cryptoBalance = getCryptoBalance();
      if (formattedValue > cryptoBalance) {
        Alert.alert(
          '',
          'You want to transfer more money than you currently have. Please enter a smaller amount of money',
        );
      } else {
        try {
          setLoading(true);
          await sendCrypto({
            assetId: CURRENCIES.COINBASE_TEST_SYMBOLS[crypto.toUpperCase()],
            amount: Number(getRawNumberString(formattedValue)),
            externalAddress: depositAddress,
          });
          navigation.navigate('Congratulations', {
            title: 'Congratulations!',
            buttonName: 'Back to Wallet',
            screenStyle: styles.successScreen,
            onContinuePress: () => navigation.navigate('CryptoHomepage'),
            subTitle: (
              <Text>
                You just sent{' '}
                <Text style={styles.amountMoney}>
                  {`${processCryptoFiatMoney(
                    formattedValue,
                  )} ${cryptocurrency}`}
                </Text>{' '}
                to {depositAddress}.
              </Text>
            ),
          });
        } catch (e) {
          Alert.alert('Warning', e.data?.message || 'Please try again', [
            {
              text: 'Cancel',
            },
          ]);
        } finally {
          setLoading(false);
        }
      }
    },
    [navigation],
  );

  return (
    <>
      {isLoading && <FullScreenLoader />}
      <ConfirmDeposit
        title={headerTitle}
        subTitle="Enter amount: "
        navigation={navigation}
        handleConfirm={handlePressConfirm}
        leftIcon={<LeftIcon icon="WA" />}
        currency={cryptocurrency}
        handleGoBack={onGoBackQrCodeScan}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Wallet Address</Text>
          <Text style={styles.cardSubTitle}>{depositAddress}</Text>
        </View>
      </ConfirmDeposit>
    </>
  );
}

SendCryptoMoney.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      depositAddress: PropTypes.string.isRequired,
      crypto: PropTypes.string.isRequired,
      onGoBackQrCodeScan: PropTypes.func,
    }),
  }).isRequired,
};

export default SendCryptoMoney;
