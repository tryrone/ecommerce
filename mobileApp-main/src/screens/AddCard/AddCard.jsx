import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, View, ScrollView } from 'react-native';
import {
  VGSCardNumberField,
  VGSExpDateField,
  VGSCVCField,
  submitCardData,
} from 'helpers/vgsCollect';

import FullScreenLoader from 'components/FullScreenLoader';
import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';

import styles from './AddCard.styles';

function AddCard({ navigation }) {
  const [cardHolder, setCardHolder] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onCardHolderChange = useCallback((value) => {
    setValidationErrors({});
    setCardHolder(value);
  }, []);

  const onAddCard = useCallback(() => {
    if (!cardHolder) {
      setValidationErrors({
        cardHolder: 'Cardholder`s name is required',
      });
    } else {
      const extraCardData = {
        cardHolder,
      };

      setIsSubmitting(true);

      submitCardData(extraCardData, ({ errorCode }) => {
        setIsSubmitting(false);
        if (errorCode) {
          if (errorCode === 400) {
            Alert.alert('', 'This debit card has been already added');
          }
        } else {
          navigation.navigate('SelectCards');
        }
      });
    }
  }, [cardHolder]);

  return (
    <ScrollView>
      <View style={styles.screenContent}>
        {isSubmitting && <FullScreenLoader />}
        <View style={styles.cardForm}>
          <View style={styles.cardField}>
            <Input
              label="Cardholder’s Name"
              labelStyle={styles.passwordInput}
              value={cardHolder}
              onChangeText={onCardHolderChange}
              errorMessage={validationErrors.cardHolder}
            />
          </View>

          <View style={styles.cardField}>
            <Text style={styles.cardFieldLabel}>Card Number</Text>
            <VGSCardNumberField style={styles.input} />
          </View>

          <View style={styles.cardFieldRow}>
            <View style={styles.cardFieldLeft}>
              <Text style={styles.cardFieldLabel}>Expiry Date</Text>
              <VGSExpDateField style={styles.input} />
            </View>
            <View style={styles.cardFieldRight}>
              <Text style={styles.cardFieldLabel}>CVC</Text>
              <VGSCVCField style={styles.input}  />
            </View>
          </View>
        </View>

        <Button title="Add Card" onPress={onAddCard} />
      </View>
    </ScrollView>
  );
}

AddCard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddCard;
