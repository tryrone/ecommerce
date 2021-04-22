import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { SEND_FLOW } from 'helpers/constants';

import Button from 'components/Button';
import SavingsPoolDetails from 'components/SavingsPoolDetails';

import styles from './ManageSavingsPool.styles';

function ManageSavingsPool({ navigation, route }) {
  const { savingsPool } = route.params;

  const [poolName, setPoolName] = useState(savingsPool.name);
  const [validationErrors, setValidationErrors] = useState({});
  const [poolMembers, setPoolMembers] = useState(savingsPool.members);

  const onPoolNameChange = useCallback((name) => {
    setValidationErrors({});
    setPoolName(name);
  }, []);

  const onAddNewMemberPress = useCallback(() => {
    navigation.navigate('ChooseContact', { sendFlow: SEND_FLOW.CONTACT_LIST });
  }, []);

  const onLeavePool = useCallback(() => {}, []);

  return (
    <View style={styles.screen}>
      <SavingsPoolDetails
        poolName={poolName}
        poolNameError={validationErrors.poolName}
        poolMembers={poolMembers}
        onAddNewMember={onAddNewMemberPress}
        onPoolNameChange={onPoolNameChange}
      />

      <Button title="Leave Pool" onPress={onLeavePool} />
    </View>
  );
}

ManageSavingsPool.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      savingsPool: PropTypes.shape({
        name: PropTypes.string,
        amount: PropTypes.number,
        members: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
};

export default ManageSavingsPool;
