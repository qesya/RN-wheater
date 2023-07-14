import {Dimensions, Platform, StatusBar, I18nManager} from 'react-native';
import {hasNotch, isTablet} from 'react-native-device-info';

const width: number = Dimensions.get('window').width;
const height: number = Dimensions.get('window').height;

const PRODUCT_IMAGE_WIDTH = 80;
const PRODUCT_IMAGE_HEIGHT = 130;

export interface Layout {
  window: {
    width: number;
    height: number;
  };
  isSmallDevice: boolean;
  productImageHeight: number;
  productImageWidth: number;
  isTablet: boolean;
  isRTL: boolean;
  smallImg: string;
  largeImg: string;
}

export const LAYOUT = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  productImageHeight: PRODUCT_IMAGE_HEIGHT,
  productImageWidth: PRODUCT_IMAGE_WIDTH,
  statusBarHeight: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  tabNavigatorHeight: Platform.OS === 'ios' && hasNotch() ? 85 : 35,
  isTablet: isTablet(),
  isRTL: I18nManager.isRTL,
  smallImg: isTablet() ? '640' : '320',
  largeImg: isTablet() ? '1024' : '640',
};
