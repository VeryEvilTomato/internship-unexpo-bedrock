import React from 'react';

import { 
    HomeScreen, 
    SettingsScreen,
} from './screens'

import { StackManagementScreen } from './management/StackManagementScreen'

import {
    Button,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

/*
 * Drawer Navigation setup for home menu
*/

const Drawer = createDrawerNavigator();

export function DrawerHomeScreen({navigation}) {
    return (
        <Drawer.Navigator initialRoute="Home">
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Management" component={StackManagementScreen} />
        </Drawer.Navigator>
    )
}