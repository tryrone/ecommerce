import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Card from 'components/Card';

import amplitudeInstance from 'helpers/amplitude.helper';
import {
  SEND_FLOW,
  ANALYTICS_EVENTS,
  MOBILE_MONEY_FLOW,
} from 'helpers/constants';

import DebitCard from 'assets/icons/debitCard.svg';
import QRCode from 'assets/icons/qrCode.svg';
import Smartphone from 'assets/icons/smartphone.svg';
import RightArrow from 'assets/icons/rightArrow.svg';

import styles from './SendMoneyMethod.styles';

const cards = [
  {
    icon: DebitCard,
    title: 'DuniaPay',
    subTitle: 'Send money to a DuniaPay username',
    handleRightClick: (navigation) => {
      navigation.navigate('ChooseContact', { sendFlow: SEND_FLOW.DUNIAPAY });
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.CHOOSE_PAYMENT_TYPE, {
        Type: 'P2P',
      });
    },
  },
  {
    icon: Smartphone,
    title: 'Mobile money',
    subTitle: 'Send money from your phone number',
    handleRightClick: (navigation) => {
      navigation.navigate('ChooseProvider', {
        phoneflow: MOBILE_MONEY_FLOW.SEND,
      });
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.CHOOSE_PAYMENT_TYPE, {
        Type: 'Mobile money',
      });
    },
  },
  {
    icon: QRCode,
    title: 'QR code',
    subTitle:
      'Scan a QR code to send money to nearby friends or to pay for services',
    handleRightClick: (navigation) => {
      navigation.navigate('QRCodeScan');
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.CHOOSE_PAYMENT_TYPE, {
        Type: 'P2P',
      });
    },
  },
];

function SendMoneyMethod({ navigation }) {
  return (
    <View style={styles.cardsContainer}>
      {cards.map(({ title, icon: Icon, subTitle, handleRightClick }) => (
        <Card
          key={title}
          leftIcon={<Icon />}
          rightIcon={<RightArrow />}
          rightIconStyle={styles.arrowBack}
          cardStyle={styles.card}
          onCardClick={() => handleRightClick(navigation)}
        >
          <View style={styles.cardContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

SendMoneyMethod.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default SendMoneyMethod;
