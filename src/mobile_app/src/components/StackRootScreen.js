import React from 'react';
import {connect} from 'react-redux';

import {LoginScreen, SplashScreen} from './screens';

import {DrawerHomeScreen} from './home/DrawerHomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Button, Icon, Text} from 'react-native-elements';

const Stack = createStackNavigator();

/*
 * Root Stack Navigation initialization
 * - Navigation Router set up through React Navigation.
 *   Where each "Screen" of the application displays as
 *   a distinct Screen component.
 */

let StackRoot = ({request}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        {/*
         * If no JWT token is registered, login screen displays
         */
        request.token.access === null ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                title: "Error, this shouldn't be visible",
              }}
            />
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
                title: "Error, this shouldn't be visible",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="DrawerHome"
              component={DrawerHomeScreen}
              options={{
                title: 'Bedrock',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

StackRoot = connect(state => state)(StackRoot);

export default StackRoot;
