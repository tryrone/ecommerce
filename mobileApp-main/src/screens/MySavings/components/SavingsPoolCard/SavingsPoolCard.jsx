import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import Text from 'components/Text';
import Avatar from 'components/Avatar';
import InfoLabel from 'components/InfoLabel';
import RightArrowIcon from 'assets/icons/rightArrow.svg';

import { processMoney } from 'helpers/utils.helper';

import styles from './SavingsPoolCard.styles';

function SavingsPoolCard({ savingsPool, onCardPress }) {
  const onPress = useCallback(() => {
    onCardPress(savingsPool);
  }, [savingsPool]);

  const interestAmount = useMemo(() => {
    return (savingsPool.amount / 100) * savingsPool.interestPercent;
  }, [savingsPool.amount, savingsPool.interestPercent]);

  return (
    <TouchableOpacity
      style={styles.poolContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.poolInfo}>
        <View style={styles.poolInfoFirstRow}>
          <Text style={styles.poolName}>{savingsPool.name}</Text>
          <View style={styles.poolMembers}>
            {savingsPool.members.map((poolMember) => (
              <View key={poolMember.id} style={styles.poolMember}>
                <Avatar
                  avatarUrl={poolMember.avatarUrl}
                  username={poolMember.id === 0 ? 'Myself' : poolMember.username}
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
        </View>
        <View style={styles.poolInfoSecondRow}>
          <Text style={styles.poolAmount}>
            ₣ {processMoney(savingsPool.amount.toString())}
          </Text>
          <InfoLabel
            text={`${savingsPool.interestPercent} % | ~ ₣ ${processMoney(
              interestAmount.toString(),
            )}`}
          />
        </View>
      </View>
      <RightArrowIcon style={styles.rightArrow} />
    </TouchableOpacity>
  );
}

SavingsPoolCard.propTypes = {
  savingsPool: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    members: PropTypes.arrayOf(PropTypes.shape({})),
    interestPercent: PropTypes.number,
  }),
  onCardPress: PropTypes.func.isRequired,
};

SavingsPoolCard.defaultProps = {
  savingsPool: {},
};

export default SavingsPoolCard;
