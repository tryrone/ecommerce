import { NativeModules, requireNativeComponent } from 'react-native';
import { getToken } from 'helpers/storage';
import config from 'resources/config';

const { RNVGSCollect } = NativeModules;

export const VGSCardNumberField = requireNativeComponent(
  'RNVGSCardNumberField',
);
export const VGSCVCField = requireNativeComponent('RNVGSCVCField');
export const VGSExpDateField = requireNativeComponent('RNVGSExpDateField');

export const initVGSCollect = async () => {
  const token = await getToken();
  return RNVGSCollect.initVGSCollect(config.vgsVaultId, config.vgsEnvironment, token);
};

export const submitCardData = async (extraCardData, callback) => {
  return RNVGSCollect.submitCardData(extraCardData, callback);
};
