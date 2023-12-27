import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorage = async (key: string, value: string) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const loadStorage = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const removeStorage = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const clearStorage = async () => {
  try {
    AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};
