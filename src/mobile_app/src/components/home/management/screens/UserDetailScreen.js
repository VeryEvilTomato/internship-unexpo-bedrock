import React from 'react';
import {connect} from 'react-redux';

import {View} from 'react-native';

const UserDetailScreenComponent = ({request, dispatch}) => {
  return <View />;
};

export const UserDetailScreen = connect(state => state)(
  UserDetailScreenComponent,
);
