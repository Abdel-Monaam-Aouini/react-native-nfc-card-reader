import {NativeModules} from 'react-native';

const {NFCCardReader} = NativeModules;

const gotoSettings = async () => {
  try {
    const setting = await NFCCardReader.gotoSettings();
    return setting;
  } catch (error) {
    console.error('Error checking NFC availability:', error);
    return false;
  }
};

const isEnabled = async () => {
  try {
    const isEnabled = await NFCCardReader.isEnabled();
    return isEnabled;
  } catch (error) {
    console.error('Error checking NFC availability:', error);
    return false;
  }
};

const isSupported = async () => {
  try {
    const isSupported = await NFCCardReader.isSupported();
    return isSupported;
  } catch (error) {
    console.error('Your mobile does not support NFC:', error);
    return false;
  }
};

const readNFC = async () => {
  try {
    const result = await NFCCardReader.readNFC();
    return result;
  } catch (error) {
    console.error('Error reading NFC:', error);
    return false;
  }
};

export {isEnabled, isSupported, gotoSettings, readNFC};
