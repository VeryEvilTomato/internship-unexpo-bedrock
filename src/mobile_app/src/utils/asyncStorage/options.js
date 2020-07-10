import AsyncStorage from '@react-native-community/async-storage';

export const saveBaseSysNum = async baseNUMBER => {
  try {
    await AsyncStorage.setItem('@options_base_number', baseNUMBER);
  } catch (e) {
    //
  }
};

export const saveBaseUrl = async baseURL => {
  try {
    await AsyncStorage.setItem('@options_base_url', baseURL);
  } catch (e) {
    //
  }
};

export const saveStorageOptions = async options => {
  try {
    await AsyncStorage.setItem('@options_base_url', options.baseURL);
    await AsyncStorage.setItem('@options_base_number', options.baseNUMBER);
    return options;
  } catch (e) {
    //
  }
};

export const retrieveStorageOptions = async () => {
  try {
    const baseNUMBER = await AsyncStorage.getItem('@options_base_number');
    const baseURL = await AsyncStorage.getItem('@options_base_url');
    return {
      baseNUMBER,
      baseURL,
    };
  } catch (e) {
    //
    return null;
  }
};
