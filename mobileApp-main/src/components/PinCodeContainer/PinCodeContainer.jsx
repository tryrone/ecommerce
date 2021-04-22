import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';

import PinCode from 'components/PinCode/PinCode';
import { setPassword } from 'helpers/keychain.helper';
import { AUTH, PIN_STATUSES } from 'helpers/constants';

function PinCodeContainer({ status, setStatus, onConfirm, wrapperStyle }) {
  const [pinCode, setPinCode] = useState('');

  const handlePinChoose = useCallback((pinValue) => {
    setPinCode(pinValue);
    setStatus(PIN_STATUSES.CONFIRM);
  }, []);

  const handleConfirmation = useCallback(
    async (pinValue) => {
      await setPassword(pinValue);
      onConfirm();
    },
    [setPassword, onConfirm],
  );

  const validateConfirmation = useCallback(
    (pinValue) => {
      return pinValue === pinCode;
    },
    [pinCode],
  );

  return (
    <View>
      {status === PIN_STATUSES.CHOOSE && (
        <PinCode
          title="Create your PIN"
          subtitle="Choose a 4-digit PIN to protect your account"
          onFulfill={handlePinChoose}
          pinFlow={AUTH.RESET}
          wrapperStyle={wrapperStyle}
        />
      )}
      {status === PIN_STATUSES.CONFIRM && (
        <PinCode
          title="Repeat your PIN"
          subtitle="Repeat a 4-digit PIN to protect your account"
          onFulfill={handleConfirmation}
          validatePinCode={validateConfirmation}
          wrapperStyle={wrapperStyle}
        />
      )}
    </View>
  );
}

PinCodeContainer.propTypes = {
  status: PropTypes.oneOf([PIN_STATUSES.CHOOSE, PIN_STATUSES.CONFIRM])
    .isRequired,
  onConfirm: PropTypes.func.isRequired,
  setStatus: PropTypes.func,
  wrapperStyle: ViewPropTypes.style,
};

PinCodeContainer.defaultProps = {
  setStatus: () => {},
  wrapperStyle: null,
};

export default PinCodeContainer;
