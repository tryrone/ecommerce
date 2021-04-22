import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import QRCode from 'components/QRCode';

import styles from './CryptoQRCodeScan.styles';

function CryptoQRCodeScan({ navigation, route }) {
  const { selectedCrypto } = route.params;
  const [isScanResult, setScanResult] = useState(false);
  const [isReactivate, setIsReactivate] = useState(true);
  const [error, setError] = useState('');
  const [depositAddress, setDepositAddress] = useState('');

  const handleContactClick = useCallback(() => {
    setIsReactivate(false);
    navigation.navigate('SendCryptoMoney', {
      depositAddress,
      crypto: selectedCrypto,
      onGoBackQrCodeScan: () => setIsReactivate(true),
    });
  }, [navigation, selectedCrypto, depositAddress]);

  const onSuccess = useCallback(
    async (e) => {
      try {
        const dataFromQrCode = e.data;

        setDepositAddress(dataFromQrCode);
        setScanResult(true);
      } catch (err) {
        if (err) {
          setError('Not Found');
          setScanResult(true);
        } else {
          throw err;
        }
      }
    },
    [setScanResult, setError],
  );

  const onContactClick = useCallback(() => {
    if (error) return () => {};
    return handleContactClick();
  }, [error, handleContactClick]);

  return (
    <QRCode
      onSuccess={onSuccess}
      isReactivate={isReactivate}
      handleContactClick={onContactClick}
      isScanResult={isScanResult}
      error={error}
      title="Wallet address"
      subTitle={depositAddress}
      contactInfoStyles={styles.contactInfoStyles}
    />
  );
}

CryptoQRCodeScan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      selectedCrypto: PropTypes.string,
    }),
  }).isRequired,
};

export default CryptoQRCodeScan;
