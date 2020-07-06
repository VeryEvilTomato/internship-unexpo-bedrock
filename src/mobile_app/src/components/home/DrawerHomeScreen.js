import React from 'react';

import {HomeScreen, SettingsScreen, LogTrackerScreen} from './screens';
import {StackUserManagementScreen} from './management/StackUserManagementScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {colors} from '@styles/constants';
import styles from '@styles';

/*
 * Drawer Navigation setup for home menu,
 * where depending of your access level
 * you'll find access to the system
 * functionality
 */

const Drawer = createDrawerNavigator();

export function DrawerHomeScreen() {
  return (
    <Drawer.Navigator
      initialRoute="Home"
      drawerStyle={{
        backgroundColor: colors.main,
      }}
      drawerContentOptions={{
        activeTintColor: colors.main,
        itemStyle: {
          marginLeft: 0,
          marginRight: 0,
          borderBottomWidth: 2,
          borderBottomRightRadius: 20,
          borderColor: colors.dark,
        },
        labelStyle: {
          color: colors.light,
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Menú principal',
          drawerIcon: ({tintColor}) => styles.icon.home(),
        }}
      />
      <Drawer.Screen
        name="UserManagement"
        component={StackUserManagementScreen}
        options={{
          title: 'Gestión de Usuarios',
          drawerIcon: ({tintColor}) => styles.icon.contactList(),
        }}
      />
      <Drawer.Screen
        name="LogTracker"
        component={LogTrackerScreen}
        options={{
          title: 'Lista de registros',
          drawerIcon: ({tintColor}) => styles.icon.logTracker(),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Opciones',
          drawerIcon: ({tintColor}) => styles.icon.settings(),
        }}
      />
    </Drawer.Navigator>
  );
}
