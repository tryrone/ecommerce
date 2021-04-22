import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  Share,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';

import * as userSelectors from 'resources/user/user.selectors';
import { sizeQrCode } from 'helpers/utils.helper';
import { APP_LINKS } from 'helpers/constants';

import Text from 'components/Text';
import MainHeader from 'components/MainHeader';
import Button from 'components/Button';

import CopyIcon from 'assets/icons/copy.svg';

import styles from './CryptoQRCodeGenerate.styles';

function CryptoQRCodeGenerate({ route }) {
  const { value } = route.params;

  const userData = useSelector(userSelectors.getUserData);

  const copyToClipboard = () => {
    Clipboard.setString(value);
  };

  const onShareUsername = useCallback(async () => {
    try {
      await Share.share({
        message: `Hi! My username in DuniaPay app is @${userData.username}\nJoin me here!\n${APP_LINKS.IOS}\n${APP_LINKS.ANDROID}`,
      });
    } catch (error) {
      Alert.alert('', 'Something went wrong. Please, try again later...');
    }
  }, [userData.username]);

  return (
    <View style={styles.screen}>
      <MainHeader title="Receive Money" subTitle="Scan your QR code" />
      <SafeAreaView style={styles.screenContent}>
        <View style={styles.qrCodeContainer}>
          <QRCode value={value} size={sizeQrCode} />
        </View>
        {Boolean(value) && (
          <View style={styles.container}>
            <Text>Share your address</Text>
            <View style={styles.cryptoAddressContainer}>
              <TouchableOpacity onPress={copyToClipboard}>
                <CopyIcon />
              </TouchableOpacity>
              <Text style={styles.cryptoAddress}>{value}</Text>
            </View>
          </View>
        )}
        <Button
          title="Share my Username"
          onPress={onShareUsername}
          style={styles.shareButton}
        />
      </SafeAreaView>
    </View>
  );
}

CryptoQRCodeGenerate.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      value: PropTypes.string,
    }),
  }).isRequired,
};

export default CryptoQRCodeGenerate;
