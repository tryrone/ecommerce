import React, { useCallback } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import Button from 'components/Button';

import errorImage from 'assets/images/error.png';

import styles from './Error.styles';

function Error({ route, navigation }) {
  const { errorText } = route.params;
  const onContinuePress = useCallback(() => {
    navigation.navigate('CryptoHomepage');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Image source={errorImage} />
        <Text style={styles.title}>Something went wrong!</Text>
        <Text style={styles.subTitle}>{errorText}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Button onPress={onContinuePress} title="Back to Wallet" />
      </View>
    </SafeAreaView>
  );
}

Error.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      errorText: PropTypes.string,
    }),
  }).isRequired,
};

export default Error;
