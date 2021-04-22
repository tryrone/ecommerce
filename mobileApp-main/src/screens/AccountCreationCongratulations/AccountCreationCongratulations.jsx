import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as userActions from 'resources/user/user.actions';
import amplitudeInstance from 'helpers/amplitude.helper';
import { ANALYTICS_EVENTS } from 'helpers/constants';

import Congratulations from 'components/Congratulations';

function AccountCreationCongratulations() {
  const dispatch = useDispatch();

  const onContinuePress = useCallback(() => {
    dispatch(userActions.setUserAuthenticated());

    amplitudeInstance.logEvent(ANALYTICS_EVENTS.REGISTRATION_COMPLETE);
  }, [dispatch]);

  return (
    <Congratulations
      title="Congratulations"
      subTitle="You created your DuniaPay account. Now you’re ready to access your wallet."
      buttonName="Go to wallet"
      onContinuePress={onContinuePress}
    />
  );
}

export default AccountCreationCongratulations;
