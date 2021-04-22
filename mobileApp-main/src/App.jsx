import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { StatusBar, AppState } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { getPassword } from 'helpers/keychain.helper';
import * as storage from 'helpers/storage';
import { STORAGE, ANALYTICS_EVENTS } from 'helpers/constants';
import amplitudeInstance from 'helpers/amplitude.helper';
import pushNotifications from 'helpers/pushNotifications.helper';
import firebaseMessaging from 'helpers/firebase.helper';
import * as userActions from 'resources/user/user.actions';

import AppNavigation from './navigation';

import configureStore from './resources/store';

import 'resources/user/user.handlers';

const { store } = configureStore();

firebaseMessaging.setBackgroundMessaging(async () => {});
pushNotifications.configure();

function App() {
  const [isLoading, setLoading] = useState(true);
  const [accessToken, setToken] = useState(null);

  const onAppStateChange = useCallback((nextAppState) => {
    if (nextAppState === 'inactive') {
      amplitudeInstance.logEvent(ANALYTICS_EVENTS.APP_CLOSE);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      AppState.addEventListener('change', onAppStateChange);

      const isOnboardingHidden = await storage.getItem(
        STORAGE.HIDE_ON_BOARDING,
      );
      const token = await storage.getToken();
      const pinCode = await getPassword();
      const pinEnterAttempts = await storage.getItem('numberPinEnter');

      store.dispatch(userActions.hideOnboarding(isOnboardingHidden));
      store.dispatch(userActions.setPinCode(pinCode));
      store.dispatch(userActions.setPinCodeAttempts(pinEnterAttempts));
      setToken(token);

      setLoading(false);

      SplashScreen.hide();

      amplitudeInstance.logEventWithGroups(ANALYTICS_EVENTS.APP_OPEN);

      return () => {
        AppState.removeEventListener('change', onAppStateChange);
      };
    };

    init();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <AppNavigation token={accessToken} />
      </Provider>
    </>
  );
}

export default App;
