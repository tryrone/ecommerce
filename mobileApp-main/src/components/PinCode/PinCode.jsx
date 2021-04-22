import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PinInput from 'components/PinInput';
import { delay } from 'helpers/utils.helper';
import { setItem, getItem } from 'helpers/storage';

import styles from './PinCode.styles';

const SHAKE_DURATION = 650;

function PinCode({
  onFulfill,
  validatePinCode,
  wrapperStyle,
  setPinCodeAttempts,
}) {
  const [pinCode, setPinCode] = useState('');
  const [hasErrors, setErrors] = useState(false);
  const containerRef = useRef();
  const navigation = useNavigation();

  const shake = useCallback(() => {
    containerRef.current.shake(SHAKE_DURATION);
  }, []);

  const handleFulfill = useCallback(
    async (pinValue) => {
      const isValidPin = await validatePinCode(pinValue);
      const numberPinEnter = await getItem('numberPinEnter');

      if (!isValidPin) {
        await setItem('numberPinEnter', numberPinEnter - 1);
        setPinCodeAttempts((prevState) => prevState - 1);
        shake();
        setErrors(true);
        setPinCode('');
        await delay(500);
        setErrors(false);
        if (numberPinEnter === 1) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
          });
        }
        return;
      }

      await setItem('numberPinEnter', 3);
      onFulfill(pinValue);
    },
    [validatePinCode, onFulfill, shake, navigation],
  );

  return (
    <View style={[wrapperStyle, styles.pinWrapper]}>
      <PinInput
        ref={containerRef}
        pinCode={pinCode}
        onPinChange={setPinCode}
        onFulfill={handleFulfill}
        hasErrors={hasErrors}
      />
    </View>
  );
}

PinCode.propTypes = {
  onFulfill: PropTypes.func.isRequired,
  validatePinCode: PropTypes.func,
  wrapperStyle: ViewPropTypes.style,
  setPinCodeAttempts: PropTypes.func,
};

PinCode.defaultProps = {
  validatePinCode: () => true,
  wrapperStyle: null,
  setPinCodeAttempts: () => {},
};

export default PinCode;
