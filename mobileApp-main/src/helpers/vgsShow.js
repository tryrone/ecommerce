import { NativeModules } from 'react-native';
import { getToken } from 'helpers/storage';
import config from 'resources/config';

const { RNVGSShow } = NativeModules;

export const initVGSShow = async () => {
  const token = await getToken();
  return RNVGSShow.initVGSShow(config.vgsVaultId, config.vgsEnvironment, token);
};
