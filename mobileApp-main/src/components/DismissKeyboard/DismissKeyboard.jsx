import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Platform, ScrollView, KeyboardAvoidingView } from 'react-native';

import styles from './DismissKeyboard.styles';

function DismissKeyboard({ children, keyboardAvoidingViewProps }) {
  const [size, setSize] = useState('');
  const contentStyle = useMemo(
    () => (size ? { height: size } : styles.flexLayout),
    [size],
  );

  const withKeyboardDismiss = (
    <ScrollView
      contentContainerStyle={contentStyle}
      bounces={false}
      overScrollMode="never"
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={(contentWidth, contentHeight) =>
        setSize(contentHeight)
      }
    >
      {children}
    </ScrollView>
  );

  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.flexLayout}
      contentContainerStyle={styles.flexLayout}
      {...keyboardAvoidingViewProps}
    >
      {withKeyboardDismiss}
    </KeyboardAvoidingView>
  ) : (
    withKeyboardDismiss
  );
}

DismissKeyboard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  keyboardAvoidingViewProps: PropTypes.shape({
    keyboardVerticalOffset: PropTypes.number,
  }),
};

DismissKeyboard.defaultProps = {
  keyboardAvoidingViewProps: {},
};

export default DismissKeyboard;
