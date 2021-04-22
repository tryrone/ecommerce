import React from 'react';
import { View, LogBox } from 'react-native';
import PropTypes from 'prop-types';

import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';

import Text from 'components/Text';
import Card from 'components/Card';

import SmartphoneIcon from 'assets/icons/smartphone.svg';
import CreditCardIcon from 'assets/icons/creditCard.svg';
import TransferIcon from 'assets/icons/transfer.svg';
import RightArrow from 'assets/icons/rightArrow.svg';

import styles from './DepositMoneyMethods.styles';

// disable react-navigation warnings passing in route params Components.
// https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
// no one case came up as we write in react-native
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const cards = [
  {
    icon: SmartphoneIcon,
    title: 'Mobile money',
    subTitle: 'Send money to your wallet from your phone number',
    handleRightClick: (navigation) => {
      navigation.navigate('DepositSavedPhoneNumbers');
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SELECT_TYPE, {
        Type: 'Mobile money',
      });
    },
  },
  {
    icon: CreditCardIcon,
    title: 'Debit card',
    subTitle: 'Send money to your wallet with a debit card',
    handleRightClick: (navigation) => {
      navigation.navigate('SelectCards');
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SELECT_TYPE, {
        Type: 'P2P',
      });
    },
  },
  {
    icon: TransferIcon,
    title: 'Bank transfer',
    subTitle: 'Send money to your wallet from a bank account',
    handleRightClick: () => {
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SELECT_TYPE, {
        Type: 'Bank',
      });
    },
  },
];

function DepositMoneyMethods({ navigation }) {
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

DepositMoneyMethods.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default DepositMoneyMethods;
