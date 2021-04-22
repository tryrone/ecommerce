import 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import * as userSelectors from 'resources/user/user.selectors';

import AppScreens from './appStack';
import AuthScreens from './authStack';
import OnBoardingScreens from './onBoardingStack';

function AppNavigation({ token }) {
  const isOnboardingHidden = useSelector(userSelectors.getHideOnboarding);
  const userAuthenticated = useSelector(userSelectors.getUserAuthenticated);

  const activeStack = useMemo(() => {
    if (userAuthenticated) {
      return <AppScreens />;
    }

    if (!isOnboardingHidden) {
      return <OnBoardingScreens />;
    }

    return <AuthScreens token={token} />;
  }, [userAuthenticated, isOnboardingHidden]);

  return <NavigationContainer>{activeStack}</NavigationContainer>;
}

AppNavigation.propTypes = {
  token: PropTypes.string,
};

AppNavigation.defaultProps = {
  token: null,
};

export default AppNavigation;
