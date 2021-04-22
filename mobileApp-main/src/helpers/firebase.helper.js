import messaging from '@react-native-firebase/messaging';

import pushNotifications from 'helpers/pushNotifications.helper';

const setBackgroundMessaging = (handler) => {
  return messaging().setBackgroundMessageHandler(handler);
};

const checkPermissions = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

const getToken = () => {
  return messaging().getToken();
};

const subscribeToMessaging = () => {
  return messaging().onMessage((remoteMessage) => {
    pushNotifications.showPushNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
      remoteMessage.data,
    );
  });
}

export default {
  setBackgroundMessaging,
  checkPermissions,
  getToken,
  subscribeToMessaging,
};
