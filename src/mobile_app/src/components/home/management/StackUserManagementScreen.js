import React from 'react';

import {UserDetailScreen, UserListScreen, UserFormScreen} from './screens';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export const StackUserManagementScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserList"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen name="UserDetail" component={UserDetailScreen} />
      <Stack.Screen name="UserList" component={UserListScreen} />
      <Stack.Screen name="UserForm" component={UserFormScreen} />
    </Stack.Navigator>
  );
};
