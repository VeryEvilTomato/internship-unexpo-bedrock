import React from 'react';

import LoginScreen from './components/login/LoginScreen'
import SplashScreen from './components/login/SplashScreen'
import MenuScreen from './components/home/MenuScreen'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    Button,
    Icon,
    Text
} from 'react-native-elements';

const Stack = createStackNavigator();

export default function App() {
    let token = "Not null"

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false ,}}
            >
                { 
                    token == null ? (
                            // Login screens
                            <>
                                <Stack.Screen
                                    name="Login"
                                    title="Error, this shouldn't be visible"
                                    component={LoginScreen}
                                />
                                <Stack.Screen
                                    name="Splash"
                                    title="SplashScreen"
                                    component={SplashScreen}
                                />
                            </>
                        ) : (
                            // Application screens
                            <>
                                <Stack.Screen
                                    name="Home"
                                    title="Menú princpal"
                                    component={MenuScreen}
                                />
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
  );
}
