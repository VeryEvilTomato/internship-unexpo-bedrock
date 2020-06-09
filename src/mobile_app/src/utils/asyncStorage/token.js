import AsyncStorage from '@react-native-community/async-storage';

export const saveStorageTokens = async token => {
  try {
    await AsyncStorage.setItem('@token_access', token.access);
    await AsyncStorage.setItem('@token_refresh', token.refresh);
  } catch (e) {
    // Error handling
  }
};

export const saveAccessToken = async accessToken => {
  try {
    await AsyncStorage.setItem('@token_access', accessToken);
  } catch (e) {
    // Error handling
  }
};

export const saveRefreshToken = async refreshToken => {
  try {
    await AsyncStorage.setItem('@token_refresh', refreshToken);
  } catch (e) {
    // Error handling
  }
};

export const retrieveStorageTokens = async () => {
  try {
    const access = await AsyncStorage.getItem('@token_access');
    const refresh = await AsyncStorage.getItem('@token_refresh');
    if (access !== null && refresh !== null) {
      return {
        access,
        refresh,
      };
    } else {
      return null;
    }
  } catch (e) {
    // Error handling
  }
};

export const clearStorageTokens = async () => {
  try {
    await AsyncStorage.removeItem('@token_access');
    await AsyncStorage.removeItem('@token_refresh');
  } catch (e) {
    // Error handling
  }
};
