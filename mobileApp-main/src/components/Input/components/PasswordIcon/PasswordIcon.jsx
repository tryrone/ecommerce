import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import EyeOnIcon from 'assets/icons/eyeOnIcon.svg';
import EyeOffIcon from 'assets/icons/eyeOffIcon.svg';

import styles from './PasswordIcon.styles';

function PasswordIcon({ isEyeOpen, onEyeClick }) {
  return (
    <TouchableOpacity onPress={onEyeClick} style={styles.eye}>
      {isEyeOpen ? <EyeOnIcon /> : <EyeOffIcon />}
    </TouchableOpacity>
  );
}

PasswordIcon.propTypes = {
  isEyeOpen: PropTypes.bool.isRequired,
  onEyeClick: PropTypes.func.isRequired,
};

export default PasswordIcon;
