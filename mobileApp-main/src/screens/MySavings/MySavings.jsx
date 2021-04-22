import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import Button from 'components/Button';
import Text from 'components/Text';
import Avatar from 'components/Avatar';

import * as userSelectors from 'resources/user/user.selectors';

import SavingsPoolCard from './components/SavingsPoolCard';
import { savingsPools } from './savingsPoolData';

import styles from './MySavings.styles';

function MySavings({ navigation }) {
  const userData = useSelector(userSelectors.getUserData);

  const onCreateNewPoolPress = useCallback(() => {
    navigation.navigate('CreateSavingsPool');
  }, []);

  const onSavingsPoolPress = useCallback((savingsPool) => {
    navigation.navigate('SavingsPool', { savingsPool });
  }, []);

  const onAvatarPress = useCallback(() => {
    navigation.navigate('Profile');
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.screenHeader}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onAvatarPress}
          style={styles.avatarContainer}
        >
          <Avatar
            username={userData.username}
            avatarUrl={userData.avatar?.url}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>My Savings</Text>
        <Text style={styles.screenSubtitle}>Choose a savings pool</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollableScreenContent}>
        <View style={styles.screenContent}>
          <View style={styles.poolsContainer}>
            {savingsPools.map((savingsPool) => (
              <SavingsPoolCard
                key={savingsPool.id}
                savingsPool={savingsPool}
                onCardPress={onSavingsPoolPress}
              />
            ))}
          </View>

          <Button title="Create New Pool" onPress={onCreateNewPoolPress} />
        </View>
      </ScrollView>
    </View>
  );
}

MySavings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MySavings;
