import {NativeModules} from 'react-native';

jest.mock('@react-native-community/async-storage', () => {});

jest.mock('react-native-push-notification', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        requestPermissions: jest.fn(),
        configure: jest.fn()
    }
});

NativeModules.ImagePickerManager = {
    showImagePicker: jest.fn(),
    launchCamera: jest.fn(),
    launchImageLibrary: jest.fn(),
  }