import React, { useCallback } from 'react';
import { SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';

import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';

import AuthHeader from 'components/AuthHeader';
import AuthHeaderLayout from 'components/AuthHeaderLayout';
import Button from 'components/Button';
import HeaderWithBackArrow from 'components/HeaderWithBackArrow';

import ListItem from './components/ListItem';
import styles from './VerifyIdentity.styles';

function VerifyIdentity({ navigation }) {
  const handlePress = useCallback(() => {
    navigation.navigate('VerifyDetails');
    amplitudeInstance.logEvent(ANALYTICS_EVENTS.VERIFY_IDENTITY);
  }, [navigation]);

  const onBackNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.screen}>
        <AuthHeaderLayout>
          <HeaderWithBackArrow onBackNavigation={onBackNavigation}>
            <AuthHeader
              title="Verify your identity"
              subtitle="Get verified to increase your deposit limits in DuniaPay"
              withLogo
            />
          </HeaderWithBackArrow>
        </AuthHeaderLayout>
        <View>
          <ListItem title="Verify your identity in minutes. You just need your ID to do it." />
          <ListItem title="Increase the security of your account." />
          <ListItem title="Increase the limit of your transactions to above 25,000." />
        </View>
        <Button onPress={handlePress} title="Get Started" />
      </View>
    </SafeAreaView>
  );
}

VerifyIdentity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default VerifyIdentity;
