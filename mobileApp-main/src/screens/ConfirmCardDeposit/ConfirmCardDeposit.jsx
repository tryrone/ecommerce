import React, { useCallback, useState, useMemo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { getCardBrandIcon } from 'helpers/cardBrand.helper';
import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';
import { deposit } from 'resources/transaction/transaction.api';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';
import VGSShowView from 'components/VGSShowView';
import VGSShowLabelView from 'components/VGSShowLabelView';

import styles from './ConfirmCardDeposit.styles';

function ConfirmCardDeposit({ navigation, route }) {
  const { cardData } = route.params;

  const [nodeHandle, setNodeHandle] = useState();

  const handlePressConfirm = useCallback(
    async (amount, formattedValue) => {
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.TRANSFER_SET_AMOUNT, {
        Type: 'Card',
        Amount: amount,
      });

      await deposit(amount);

      amplitudeInstance.logEvent(
        ANALYTICS_EVENTS.TRANSFER_COMPLETE_TRANSACTION,
        {
          Type: 'Card',
          'Total amount': amount,
        },
      );

      navigation.navigate('Congratulations', {
        title: 'Congratulations!',
        buttonName: 'Back to Wallet',
        screenStyle: styles.successScreen,
        onContinuePress: () => navigation.navigate('Homepage'),
        subTitle: (
          <Text>
            You just toped up{' '}
            <Text style={styles.amountMoney}>₣ {formattedValue}</Text> to your
            DuniaPay Wallet.
          </Text>
        ),
      });
    },
    [navigation],
  );

  const CardBrandIcon = useMemo(() => {
    return getCardBrandIcon(cardData.cardBrand);
  }, [cardData.cardBrand]);

  return (
    <ConfirmDeposit
      title="Debit Card Deposit"
      subTitle="Enter amount"
      navigation={navigation}
      leftIcon={<CardBrandIcon />}
      handleConfirm={handlePressConfirm}
    >
      <View style={styles.cardContent}>
        <VGSShowView cardId={cardData._id} onHandle={setNodeHandle} />
        <VGSShowLabelView
          nodeHandle={nodeHandle}
          contentPath="cardNumber"
          style={styles.cardTitle}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.cardSubTitle}>{cardData.cardHolder}</Text>
        </View>
      </View>
    </ConfirmDeposit>
  );
}

ConfirmCardDeposit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      cardData: PropTypes.shape({
        _id: PropTypes.string,
        cardBrand: PropTypes.string,
        cardHolder: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ConfirmCardDeposit;
