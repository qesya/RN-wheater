import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const isMinimumIOSVersion = (iOSVersion: number): boolean => {
  // iOSVersion eg. 14.5
  return Platform.OS === 'ios' && parseFloat(Platform.Version) >= iOSVersion;
};
