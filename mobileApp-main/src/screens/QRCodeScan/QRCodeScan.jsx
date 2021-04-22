import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import * as userApi from 'resources/user/user.api';
import * as userSelectors from 'resources/user/user.selectors';

import QRCode from 'components/QRCode';

function QRCodeScan({ navigation }) {
  const currentUserData = useSelector(userSelectors.getUserData);

  const [isScanResult, setScanResult] = useState(false);
  const [error, setError] = useState('');
  const [userDataFromServer, setUserDataFromServer] = useState({});
  const [isReactivate, setIsReactivate] = useState(true);

  const handleContactClick = useCallback(() => {
    setIsReactivate(false);
    navigation.navigate('SendDuniaMoney', {
      recipientId: userDataFromServer._id,
      phoneContactName: userDataFromServer.username,
      duniapayName: userDataFromServer.phoneNumber,
      onGoBackQrCodeScan: () => setIsReactivate(true),
    });
  }, [navigation, userDataFromServer]);

  const onSuccess = useCallback(
    async (e) => {
      try {
        const dataFromQrCode = JSON.parse(e.data);
        if (dataFromQrCode.DUNIAPAY === currentUserData._id) {
          setScanResult(false);
          setUserDataFromServer({});
          Alert.alert('', 'You can`t transfer money to yourself');
        } else {
          const userData = await userApi.getUserData({
            userId: dataFromQrCode.DUNIAPAY,
          });
          setError('');
          setUserDataFromServer(userData);
          setScanResult(true);
        }
      } catch (err) {
        if (err) {
          setUserDataFromServer({});
          setError('Not Found');
          setScanResult(true);
        } else {
          throw err;
        }
      }
    },
    [setUserDataFromServer, setScanResult, setError],
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
      title={userDataFromServer.username}
      subTitle={userDataFromServer.phoneNumber}
    />
  );
}

QRCodeScan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default QRCodeScan;
