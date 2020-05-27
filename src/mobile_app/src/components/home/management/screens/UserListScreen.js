import React from 'react';

import {View, Button} from 'react-native';

import {UserProfileList} from '../UserProfileList';

export const UserListScreen = ({navigation}) => {
  return (
    <View>
      <Button
        title="Agregar nuevo usuario"
        onPress={() => {
          navigation.navigate('UserForm');
        }}
      />
      <UserProfileList navigation={navigation} />
    </View>
  );
};
