import React from 'react';

import {HomeScreen, SettingsScreen} from './screens';
import {StackUserManagementScreen} from './management/StackUserManagementScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';

/*
 * Drawer Navigation setup for home menu,
 * where depending of your access level
 * you'll find access to the system
 * functionality
 */

const Drawer = createDrawerNavigator();

export function DrawerHomeScreen() {
  return (
    <Drawer.Navigator initialRoute="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Menú principal',
        }}
      />
      <Drawer.Screen
        name="UserManagement"
        component={StackUserManagementScreen}
        options={{
          title: 'Gestión de Usuarios',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Opciones',
        }}
      />
    </Drawer.Navigator>
  );
}
