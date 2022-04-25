import {
  Platform,
  Alert,
  AlertOptions,
  AlertButton,
  PlatformOSType,
} from 'react-native';
import { getVersion } from 'react-native-device-info';
export function getPlatform(): PlatformOSType {
  return Platform.OS;
}

export function getAppVersion(): string {
  return getVersion();
}
export function isIOS(): boolean {
  return getPlatform() === 'ios';
}

export function isWeb(): boolean {
  return getPlatform() === 'web';
}

export function triggerAlert(
  message: string,
  title = '',
  buttons: AlertButton[] = [{ text: 'Ok' }],
  options?: AlertOptions,
) {
  Alert.alert(title, message, buttons, options);
}
