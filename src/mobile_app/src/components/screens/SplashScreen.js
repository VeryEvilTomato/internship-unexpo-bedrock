import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

import {
  retrieveStorageTokens,
  retrieveStorageOptions,
} from '@utils/asyncStorage';
import {
  receiveToken,
  decodeJWT,
  setOptions,
  setOptionsDefault,
} from '@redux/actions';

const SplashScreenComponent = ({navigation, dispatch}) => {
  // Check during application startup if a token is saved
  // in application storage.
  useFocusEffect(
    useCallback(() => {
      retrieveStorageOptions().then(options => {
        if (!options.baseURL || !options.baseNUMBER) {
          dispatch(setOptionsDefault());
        } else {
          dispatch(setOptions(options, false));
        }
        retrieveStorageTokens()
          .then(token => {
            let tokenExists = token !== null ? true : false;
            // Save tokens in redux store
            if (tokenExists) {
              dispatch(receiveToken(token));
            }
            return tokenExists;
          })
          .then(tokenExists => {
            if (tokenExists) {
              // Decode and extract User ID
              dispatch(decodeJWT());
              navigation.navigate('DrawerHome');
            } else {
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            }
          });
      });
    }, [dispatch, navigation]),
  );

  return (
    <View>
      <Icon type="material" name="donut-small" />
    </View>
  );
};

export const SplashScreen = connect(state => state)(SplashScreenComponent);
