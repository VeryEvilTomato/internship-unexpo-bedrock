import React from 'react';
import {connect} from 'react-redux';

import {Button, Icon, Input} from 'react-native-elements';

import {View} from 'react-native';

let SplashScreenComponent = ({request, navigation}) => {
  if (request.didInvalidate) {
    navigation.navigate('Login');
  }
  return (
    <View>
      <Icon type="material" name="donut-small" />
    </View>
  );
};

export const SplashScreen = connect(state => state)(SplashScreenComponent);

