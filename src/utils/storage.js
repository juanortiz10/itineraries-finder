import { AsyncStorage } from 'react-native';

export const saveItem = async (keyName, keyValue) => {
  try {
    await AsyncStorage.setItem(keyName, keyValue);
    return true;
  } catch (error) {
    return false;
  }
};

export const getItem = async (keyValue) => {
  try {
    return await AsyncStorage.getItem(keyValue);
  } catch (error) {
    return error;
  }
};

export const clearAll = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    return error;
  }
};
