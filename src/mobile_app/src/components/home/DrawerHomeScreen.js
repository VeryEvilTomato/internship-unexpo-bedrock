import React from 'react';

import { 
    HomeScreen, 
    SettingsScreen,
    UserManagementScreen,
} from './screens'


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
            <Drawer.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ 
                    title: `Menú principal`
                }}
            />
            <Drawer.Screen 
                name="UserManagement" 
                component={UserManagementScreen}
                options={{ 
                    title: `Gestión de Usuarios`
                }}
            />
            <Drawer.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{ 
                    title: `Opciones`
                }}
            />
        </Drawer.Navigator>
    )
}
