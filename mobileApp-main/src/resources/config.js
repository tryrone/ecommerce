import { Platform } from 'react-native';
import Config from 'react-native-config';

const getApiUrl = () => {
  if (Config.MODE !== 'DEV') {
    return Config.API_URL;
  }
  return Platform.OS === 'android'
    ? Config.ANDROID_API_URL
    : Config.IOS_API_URL;
};

export default {
  apiUrl: getApiUrl(),
  passbaseApiKey: Config.PASSBASE_API_KEY,
  amplitudeApiKey: Config.AMPLITUDE_API_KEY,
  vgsVaultId: Config.VGS_VAULT_ID,
  vgsEnvironment: Config.VGS_ENVIRONMENT,
  googleAuthIosClientId: Config.GOOGLE_IOS_CLIENT_ID,
  googleAuthWebClientId: Config.GOOGLE_WEB_CLIENT_ID,
};
