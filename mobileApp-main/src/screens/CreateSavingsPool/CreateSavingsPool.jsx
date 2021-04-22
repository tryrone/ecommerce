import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { SEND_FLOW } from 'helpers/constants';

import Button from 'components/Button';
import SavingsPoolDetails from 'components/SavingsPoolDetails';

import styles from './CreateSavingsPool.styles';

function CreateSavingsPool({ navigation }) {
  const [poolName, setPoolName] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [poolMembers, setPoolMembers] = useState([
    {
      id: 0,
      budget: 0,
    },
  ]);

  const onPoolNameChange = useCallback((name) => {
    setValidationErrors({});
    setPoolName(name);
  }, []);

  const onAddNewMemberPress = useCallback(() => {
    navigation.navigate('ChooseContact', { sendFlow: SEND_FLOW.CONTACT_LIST });
  }, []);

  const onCreatePool = useCallback(() => {
    if (!poolName) {
      setValidationErrors({
        poolName: 'Pool name is required',
      });
    }
  }, [poolName]);

  return (
    <View style={styles.screen}>
      <SavingsPoolDetails
        poolName={poolName}
        poolNameError={validationErrors.poolName}
        poolMembers={poolMembers}
        onAddNewMember={onAddNewMemberPress}
        onPoolNameChange={onPoolNameChange}
      />

      <Button title="Create Pool" onPress={onCreatePool} />
    </View>
  );
}

CreateSavingsPool.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default CreateSavingsPool;
