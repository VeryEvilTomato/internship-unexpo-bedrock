import React from 'react';

import {
    Button,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

import { UserProfileList } from '../UserProfileList';

/*
 * User management through display of users and their 
 * information in a list, alongisde options such as
 * blocking them or deleting them off the system.
*/

export function UserManagementScreen({navigation}) {
    return (
        <View>
            <Button
                title="Agregar usuario nuevo"
                onPress={() => navigation.navigate("UserAddForm")}
            /> 
            <UserProfileList/>
        </View>
    )
}
