import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getCardBrandIcon } from 'helpers/cardBrand.helper';

import Text from 'components/Text';
import VGSShowView from 'components/VGSShowView';
import VGSShowLabelView from 'components/VGSShowLabelView';

import styles from './DebitCard.styles';

function DebitCard({ cardData, onCardRemove }) {
  const navigation = useNavigation();
  const [nodeHandle, setNodeHandle] = useState();

  const onCardPress = useCallback(() => {
    navigation.navigate('ConfirmCardDeposit', { cardData });
  }, []);

  const onCardRemovePress = useCallback(() => {
    Alert.alert(
      'Remove Card?',
      'Please confirm if you want to remove a card?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Remove',
          onPress: () => onCardRemove(cardData._id),
        },
      ],
    );
  }, [cardData._id]);

  const CardBrandIcon = useMemo(() => {
    return getCardBrandIcon(cardData.cardBrand);
  }, [cardData.cardBrand]);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onCardPress}
        style={styles.card}
      >
        <CardBrandIcon style={styles.cardBrandIcon} />

        <View style={styles.cardInfo}>
          <VGSShowView cardId={cardData._id} onHandle={setNodeHandle} />
          {nodeHandle && (
            <VGSShowLabelView
              nodeHandle={nodeHandle}
              contentPath="cardNumber"
              style={styles.cardNumber}
            />
          )}
          <Text style={styles.cardHolder}>{cardData.cardHolder}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onCardRemovePress}
        activeOpacity={0.7}
        style={styles.cardRemove}
      >
        <Text style={styles.cardRemoveText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

DebitCard.propTypes = {
  cardData: PropTypes.shape({
    _id: PropTypes.string,
    cardBrand: PropTypes.string,
    cardHolder: PropTypes.string,
  }),
  onCardRemove: PropTypes.func.isRequired,
};

DebitCard.defaultProps = {
  cardData: {},
};

export default DebitCard;
