import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

import { processMoney } from 'helpers/utils.helper';

import Input from 'components/Input';
import Avatar from 'components/Avatar';
import Text from 'components/Text';

import AddIcon from 'assets/icons/add.svg';

import styles from './SavingsPoolDetails.styles';

function SavingsPoolDetails({
  poolName,
  poolNameError,
  poolMembers,
  onAddNewMember,
  onPoolNameChange,
}) {
  return (
    <View style={styles.poolContainer}>
      <Input
        label="Pool name"
        value={poolName}
        onChangeText={onPoolNameChange}
        errorMessage={poolNameError}
      />

      <View style={styles.poolMembersContainer}>
        {poolMembers.map((member) => (
          <View style={styles.poolMember} key={member.id}>
            <Avatar
              avatarUrl={member.avatarUrl}
              username={member.id === 0 ? 'Myself' : member.username}
              avatarStyle={styles.poolMemberAvatar}
              containerStyle={styles.poolMemberAvatarContainer}
            />
            <Text style={styles.poolMemberName}>
              {member.id === 0 ? 'Myself' : member.username}
            </Text>
            <Text style={styles.poolMemberBudget}>
              {`₣ ${processMoney(member.budget.toString())}`}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addMemberContainer}
        activeOpacity={0.7}
        onPress={onAddNewMember}
      >
        <AddIcon />
        <Text style={styles.addMemberText}>Add pool member</Text>
      </TouchableOpacity>
    </View>
  );
}

SavingsPoolDetails.propTypes = {
  poolName: PropTypes.string,
  poolNameError: PropTypes.string,
  poolMembers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      avatarUrl: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
  onAddNewMember: PropTypes.func.isRequired,
  onPoolNameChange: PropTypes.func.isRequired,
};

SavingsPoolDetails.defaultProps = {
  poolName: '',
  poolNameError: '',
  poolMembers: [],
};

export default SavingsPoolDetails;
