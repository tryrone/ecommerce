import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { PhoneNumberUtil } from 'google-libphonenumber';

import Text from 'components/Text';
import DownArrow from 'assets/icons/downArrow.svg';

import colors from 'themes/colors';

import styles from './PhoneNumberInput.styles';

const phoneUtil = PhoneNumberUtil.getInstance();

function PhoneNumberInput({
  inputRef,
  phoneNumber,
  onChangePhone,
  onChangeFormattedPhone,
  onBlur,
  error,
  text,
}) {
  let number;
  let region;
  if (phoneNumber) {
    const parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(phoneNumber);

    number = parsedPhoneNumber.getNationalNumber().toString();

    region = phoneUtil.getRegionCodeForNumber(parsedPhoneNumber);
  }

  return (
    <View style={styles.container}>
      {text && <Text style={styles.label}>{text}</Text>}
      <PhoneInput
        ref={inputRef}
        defaultCode={region || 'BF'}
        defaultValue={number || ''}
        layout="first"
        placeholder=" "
        onChangeText={onChangePhone}
        onChangeFormattedText={onChangeFormattedPhone}
        renderDropdownImage={<DownArrow />}
        containerStyle={[
          styles.inputContainer,
          error && styles.inputContainerError,
        ]}
        codeTextStyle={[styles.text, styles.codeText]}
        textInputStyle={[styles.text, styles.phoneText]}
        textContainerStyle={styles.textInputContainer}
        countryPickerButtonStyle={styles.countryInputContainer}
        textInputProps={{ selectionColor: colors.theme, onBlur }}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

PhoneNumberInput.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({}),
    }),
  ]),
  phoneNumber: PropTypes.string,
  onChangePhone: PropTypes.func.isRequired,
  onChangeFormattedPhone: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  text: PropTypes.string,
};

PhoneNumberInput.defaultProps = {
  onBlur: () => {},
  inputRef: null,
  phoneNumber: null,
  error: null,
  text: null,
};

export default PhoneNumberInput;
