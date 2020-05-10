import { Platform, Dimensions, StatusBar } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const IS_IPHONE_X_XS =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (Dimensions.get('window').height === 812 ||
    Dimensions.get('window').width === 812);

export const IS_IPHONE_X_MAX_XR =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (Dimensions.get('window').height === 896 ||
    Dimensions.get('window').width === 896);

export const IS_IPHONE_X = IS_IPHONE_X_XS || IS_IPHONE_X_MAX_XR;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const STATUS_BAR_HEIGHT_ANDROID =
  StatusBar && StatusBar.currentHeight ? StatusBar.currentHeight : null;

export const SMALL_DEVICE_WIDTH = 350;

export const TAB_BAR_HEIGHT = IS_IPHONE_X ? 80 : 50;
