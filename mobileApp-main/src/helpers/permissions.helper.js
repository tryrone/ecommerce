import { Platform } from 'react-native';
import { RESULTS, check, request } from 'react-native-permissions';

export const checkPermissions = async (iosPermissions) => {
  if (Platform.OS === 'ios') {
    const permissions = await check(iosPermissions);

    if (
      permissions === RESULTS.UNAVAILABLE ||
      permissions === RESULTS.BLOCKED ||
      permissions === RESULTS.LIMITED
    ) {
      return false;
    }

    if (permissions === RESULTS.DENIED) {
      const requestPermissions = await request(iosPermissions);
      if (requestPermissions === RESULTS.BLOCKED) {
        return false;
      }
      if (requestPermissions === RESULTS.GRANTED) {
        return true;
      }
    }

    if (permissions === RESULTS.GRANTED) {
      return true;
    }
  }
  return true;
};
