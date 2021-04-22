import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { PIN_STATUSES } from 'helpers/constants';

import MainHeader from 'components/MainHeader';
import PinCodeContainer from 'components/PinCodeContainer';

import styles from './PinCodeReset.styles';

function PinCodeReset({ navigation }) {
  const [status, setStatus] = useState(PIN_STATUSES.CHOOSE);

  const headerTitle = useMemo(() => {
    return status === PIN_STATUSES.CHOOSE
      ? 'Create your PIN'
      : 'Repeat your PIN';
  }, [status]);

  const headerSubTitle = useMemo(() => {
    return status === PIN_STATUSES.CHOOSE
      ? 'Choose a 4-digit PIN to protect your account'
      : 'Repeat a 4-digit PIN to protect your account';
  }, [status]);

  const onConfirm = useCallback(() => {
    navigation.navigate('Congratulations', {
      title: 'Congratulations!',
      buttonName: 'Go to Wallet',
      screenStyle: styles.successScreen,
      onContinuePress: () => navigation.navigate('Homepage'),
      subTitle: <Text>You password and PIN have been succesfully reset.</Text>,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.resetPinHeader}>
        <MainHeader title={headerTitle} subTitle={headerSubTitle} />
      </View>
      <PinCodeContainer
        status={status}
        setStatus={setStatus}
        onConfirm={onConfirm}
        wrapperStyle={styles.pinWrapper}
      />
    </View>
  );
}

PinCodeReset.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PinCodeReset;
