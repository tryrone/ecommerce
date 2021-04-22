import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PinCodeInput from 'react-native-smooth-pincode-input';
import { View as AnimatableView } from 'react-native-animatable';

import styles from './PinInput.styles';

const PinInput = forwardRef(
  (
    {
      keyboardType,
      cellSpacing,
      cellSize,
      onFulfill,
      restrictToNumbers,
      pinCode,
      onPinChange,
      hasErrors,
      autoFocus,
      codeLength,
    },
    ref,
  ) => {
    return (
      <AnimatableView ref={ref}>
        <PinCodeInput
          cellStyle={[styles.cellStyle, hasErrors && styles.cellStyleError]}
          textStyle={styles.cellTextStyle}
          cellStyleFocused={styles.cellStyleFocused}
          keyboardType={keyboardType}
          cellSpacing={cellSpacing}
          cellSize={cellSize}
          value={pinCode}
          onTextChange={onPinChange}
          onFulfill={onFulfill}
          restrictToNumbers={restrictToNumbers}
          autoFocus={autoFocus}
          codeLength={codeLength}
        />
      </AnimatableView>
    );
  },
);

PinInput.propTypes = {
  onPinChange: PropTypes.func.isRequired,
  onFulfill: PropTypes.func.isRequired,
  cellSize: PropTypes.number,
  cellSpacing: PropTypes.number,
  keyboardType: PropTypes.oneOf(['number-pad', 'numeric']),
  restrictToNumbers: PropTypes.bool,
  pinCode: PropTypes.string,
  hasErrors: PropTypes.bool,
  autoFocus: PropTypes.bool,
  codeLength: PropTypes.number,
};

PinInput.defaultProps = {
  cellSize: 50,
  cellSpacing: 36,
  keyboardType: 'number-pad',
  restrictToNumbers: true,
  pinCode: '',
  hasErrors: false,
  autoFocus: true,
  codeLength: 4,
};

export default PinInput;
