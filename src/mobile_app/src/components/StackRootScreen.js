import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {DrawerHomeScreen} from './home/DrawerHomeScreen';
import {LoginScreen, SplashScreen} from './screens';

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
        initialRouteName="Splash"
        screenOptions={{
          headerTitleAlign: 'center',
        }}>
        {/*
         * If no JWT token is registered, login screen displays,
         * else home screen will display.
         */
        request.token.access === null ? (
          <>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
                title: "Error, this shouldn't be visible",
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
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
