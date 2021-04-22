import React, { useCallback } from 'react';

import Congratulations from 'components/Congratulations';

function VerifyEmail() {
  const onContinuePress = useCallback(() => {}, []);

  return (
    <Congratulations
      title="Verify email"
      subTitle="Please verify your email to protect your account."
      buttonName="Open email"
      onContinuePress={onContinuePress}
    />
  );
}

export default VerifyEmail;
