import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import SavedPhoneNumbers from 'components/SavedPhoneNumbers';

import { MOBILE_MONEY_FLOW } from 'helpers/constants';

function DepositSavedPhoneNumbers({ navigation }) {
  const handleConfirm = useCallback(() => {
    navigation.navigate('ConfirmMobileDeposit');
  }, [navigation]);

  return (
    <SavedPhoneNumbers
      handleConfirm={handleConfirm}
      navigation={navigation}
      phoneflow={MOBILE_MONEY_FLOW.DEPOSIT}
    />
  );
}

DepositSavedPhoneNumbers.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default DepositSavedPhoneNumbers;
