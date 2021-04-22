import React, { useCallback, useState, useMemo } from 'react';
import { TextInput, Text, View, Keyboard, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import colors from 'themes/colors';

import Warning from 'assets/icons/warning.svg';

import PasswordIcon from './components/PasswordIcon';

import styles from './Input.styles';

const getBorderStyle = (focused, errorMessage, value) => {
  if (focused) return styles.inputFocused;
  if (errorMessage) return styles.inputError;
  if (!errorMessage && value) return styles.inputCorrect;
  return null;
};

function Input({
  value,
  onChangeText,
  placeholder,
  errorMessage,
  keyboardType,
  textContentType,
  onBlur,
  inputWrapperStyle,
  labelStyle,
  inputStyle,
  label,
  autoFocus,
  maxLength,
  autoCapitalize,
  inputLabelWrapper,
  disabled,
  leftIcon: LeftIcon,
}) {
  const [focused, setFocused] = useState(false);

  const [isEyeOpen, setEye] = useState(false);

  const isPassword = useMemo(() => textContentType === 'password', [
    textContentType,
  ]);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  const handleBlur = useCallback(
    (e) => {
      setFocused(false);
      onBlur(e);
    },
    [onBlur, setFocused],
  );

  const handleChange = useCallback(
    (values) => {
      return isPassword ? onChangeText(values.trim()) : onChangeText(values);
    },
    [onChangeText, value],
  );

  const onEyeClick = useCallback(() => {
    setEye((prevState) => !prevState);
  }, [setEye]);

  return (
    <View style={[styles.inputWrapper, inputLabelWrapper]}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          getBorderStyle(focused, errorMessage, value),
          inputWrapperStyle,
          disabled && styles.disabled,
        ]}
      >
        {LeftIcon && <LeftIcon style={styles.leftIcon} />}
        <TextInput
          style={[
            isPassword ? [styles.input, styles.inputWithIcon] : styles.input,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          onChangeText={handleChange}
          value={value}
          focused={focused}
          onFocus={handleFocus}
          editable={!disabled}
          onBlur={handleBlur}
          textContentType={textContentType}
          onSubmitEditing={Keyboard.dismiss}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !isEyeOpen}
          autoFocus={autoFocus}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
        />
        {isPassword && (
          <PasswordIcon onEyeClick={onEyeClick} isEyeOpen={isEyeOpen} />
        )}
      </View>
      {!!errorMessage && (
        <View style={styles.containerError}>
          <Warning style={styles.warning} />
          <Text style={styles.textError}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
}

Input.propTypes = {
  onChangeText: PropTypes.func,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  inputWrapperStyle: ViewPropTypes.style,
  inputStyle: ViewPropTypes.style,
  inputLabelWrapper: ViewPropTypes.style,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  textContentType: PropTypes.oneOf([
    'name',
    'none',
    'oneTimeCode',
    'telephoneNumber',
    'emailAddress',
    'password',
    'URL',
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  labelStyle: ViewPropTypes.style,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  autoCapitalize: PropTypes.oneOf(['none', 'characters', 'sentences', 'words']),
  leftIcon: PropTypes.elementType,
};

Input.defaultProps = {
  onChangeText: () => {},
  onBlur: () => {},
  inputWrapperStyle: null,
  errorMessage: '',
  inputLabelWrapper: null,
  labelStyle: null,
  disabled: false,
  inputStyle: null,
  textContentType: 'none',
  keyboardType: 'default',
  label: '',
  value: '',
  placeholder: '',
  autoFocus: false,
  maxLength: undefined,
  autoCapitalize: 'none',
  leftIcon: null,
};

export default Input;
