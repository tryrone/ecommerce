import React from 'react';
import { Modal } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import colors from 'themes/colors';
import loader from 'assets/animations/loader.json';

import styles from './FullScreenLoader.styles';


function FullScreenLoader() {
  return (
    <Modal
      animationType="none"
      transparent
      visible
    >
      <AnimatedLoader
        visible
        source={loader}
        overlayColor={colors.loaderOverlay}
        animationStyle={styles.loader}
      />
    </Modal>
  );
}

export default FullScreenLoader;
