import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

import {retrieveStorageTokens} from '@utils/asyncStorage';
import {receiveToken, decodeJWT} from '@redux/actions';

const SplashScreenComponent = ({navigation, dispatch}) => {
  // Check during application startup if a token is saved
  // in application storage.
  useEffect(() => {
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
          navigation.navigate('Login');
        }
      });
  }, [dispatch, navigation]);
  return (
    <View>
      <Icon type="material" name="donut-small" />
    </View>
  );
};

export const SplashScreen = connect(state => state)(SplashScreenComponent);
