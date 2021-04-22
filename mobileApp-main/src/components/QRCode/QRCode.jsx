import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { View, ViewPropTypes } from 'react-native';

import { getInitials } from 'helpers/utils.helper';

import Contact from 'components/Contact';
import MainHeader from 'components/MainHeader';
import Text from 'components/Text';

import styles from './QRCode.styles';

function QRCode({
  onSuccess,
  isScanResult,
  handleContactClick,
  error,
  title,
  subTitle,
  contactInfoStyles,
  isReactivate,
}) {
  const onContactClick = useCallback(() => {
    if (error) return () => {};
    return handleContactClick();
  }, [handleContactClick]);

  return (
    <>
      <MainHeader title="Scan QR Code" />
      <View style={styles.screen}>
        <QRCodeScanner
          showMarker
          onRead={onSuccess}
          markerStyle={styles.marker}
          cameraStyle={styles.camera}
          cameraTimeout={isReactivate ? 0 : 1000}
          vibrate={false}
          reactivate
          reactivateTimeout={3000}
        />
        {isScanResult ? (
          <View style={styles.contactContainer}>
            <Contact
              icon={error ? 'N' : getInitials(title)}
              onContactClick={onContactClick}
              isDivideLine={false}
              contactInfoStyles={contactInfoStyles}
            >
              <View style={styles.cardContent}>
                <Text style={styles.phoneContactName}>{error || title}</Text>
                <Text style={styles.duniaContactName}>
                  {error ? 'Merchant is not DuniaPay’s user' : subTitle}
                </Text>
              </View>
            </Contact>
          </View>
        ) : null}
      </View>
    </>
  );
}

QRCode.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  isScanResult: PropTypes.bool.isRequired,
  handleContactClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  contactInfoStyles: ViewPropTypes.style,
  isReactivate: PropTypes.bool.isRequired,
};

QRCode.defaultProps = {
  title: '',
  subTitle: '',
  error: '',
  contactInfoStyles: null,
};

export default QRCode;
