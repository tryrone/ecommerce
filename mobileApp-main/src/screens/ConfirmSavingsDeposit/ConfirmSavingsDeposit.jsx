import React, { useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import ConfirmDeposit from 'components/ConfirmDeposit';
import Avatar from 'components/Avatar';

import { processMoney } from 'helpers/utils.helper';

import styles from './ConfirmSavingsDeposit.styles';

function ConfirmSavingsDeposit({ navigation, route }) {
  const { savingsPool } = route.params;

  const handlePressConfirm = useCallback(
    async (amount, formattedValue) => {
      navigation.navigate('Congratulations', {
        title: 'Congratulations!',
        buttonName: 'Back to Wallet',
        screenStyle: styles.successScreen,
        onContinuePress: () => navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        }),
        subTitle: (
          <Text>
            You just deposited{' '}
            <Text style={styles.amountMoney}>₣ {formattedValue}</Text>
            {` to your savings pool '${savingsPool.name}'.`}
          </Text>
        ),
      });
    },
    [navigation],
  );

  return (
    <ConfirmDeposit
      title="Deposit Savings Pool"
      subTitle="Enter amount"
      navigation={navigation}
      handleConfirm={handlePressConfirm}
    >
      <View style={styles.cardContent}>
        <Text style={styles.poolName}>{savingsPool.name}</Text>
        <View style={styles.poolInfo}>
          <View style={styles.poolMembers}>
            {savingsPool.members.map((poolMember) => (
              <View key={poolMember.id} style={styles.poolMember}>
                <Avatar
                  avatarUrl={poolMember.avatarUrl}
                  username={
                    poolMember.id === 0 ? 'Myself' : poolMember.username
                  }
                  avatarStyle={styles.poolMemberAvatar}
                  containerStyle={
                    poolMember.avatarUrl
                      ? styles.poolMemberAvatarContainer
                      : styles.poolMemberInitialsContainer
                  }
                />
              </View>
            ))}
          </View>
          <Text style={styles.poolAmount}>
            ₣ {processMoney(savingsPool.amount.toString())}
          </Text>
        </View>
      </View>
    </ConfirmDeposit>
  );
}

ConfirmSavingsDeposit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      savingsPool: PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.number,
        members: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number,
            avatarUrl: PropTypes.string,
            username: PropTypes.string,
          }),
        ),
      }),
    }),
  }).isRequired,
};

export default ConfirmSavingsDeposit;
