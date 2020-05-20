import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import {
    Button,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

import { 
    UserManagementScreen, 
    UserFormScreen, 
} from './screens/'

/*
 * Nested Navigation setup to manage users inside
 * Bedrock's system. Including:
 * - Listing existing users alongside their data
 * - Adding a new user
 * - Blocking or deleting an existing user
*/

const Stack = createStackNavigator();

export function StackManagementScreen({navigation}) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "center"
            }}
        >
            <Stack.Screen
                component={UserManagementScreen}
                name='UserManagement'
                options = {{ title: `Lista de usuarios`}}
            />
            <Stack.Screen
                component={UserFormScreen}
                name='UserAddForm'
                options = {{ title: `Agregar un usuario`}}
            />
        </Stack.Navigator>
    )
}
