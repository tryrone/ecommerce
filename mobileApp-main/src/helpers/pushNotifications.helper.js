import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';

const configure = () => {
  PushNotification.configure({
    onNotification(notification) {
      if (!notification?.data) {
        return;
      }

      // eslint-disable-next-line no-param-reassign
      notification.userInteraction = true;

      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel({
    channelId: 'default-channel-id',
    channelName: 'Push notifications channel',
    importance: 4,
    vibrate: true,
  });
};

const buildAndroidNotification = (title, message, data = {}, options = {}) => ({
  autoCancel: true,
  invokeApp: true,
  largeIcon: options.largeIcon || 'ic_launcher',
  smallIcon: options.smallIcon || 'ic_notification',
  bigText: message || '',
  subText: title || '',
  vibrate: options.vibrate || true,
  vibration: options.vibration || 300,
  priority: options.priority || 'high',
  importance: options.importance || 'high',
  onlyAlertOnce: true,
  data,
});

const buildIosNotification = (title, message, data = {}, options = {}) => ({
  alertAction: options.alertAction || 'view',
  category: options.category || '',
  userInfo: {
    item: data,
  },
});

const showPushNotification = (title, message, data = {}, options = {}) => {
  const platformNotification =
    Platform.OS === 'ios'
      ? buildIosNotification(title, message, data, options)
      : buildAndroidNotification(title, message, data, options);

  PushNotification.localNotification({
    ...platformNotification,
    title: title || '',
    message: message || '',
    playSound: options.playSound || false,
    soundName: options.soundName || 'default',
    userInteraction: false,
  });
};

export default {
  configure,
  showPushNotification,
};
