import React from 'react';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

import { UserProfileList, UserForm } from '../management';
import { OverlayModal } from '@containers';

/*
 * User management through display of users and their 
 * information in a list, alongisde options such as
 * blocking them or deleting them off the system.
*/

const Example = () => {
    return <Text>Hello world!</Text>
}

export function UserManagementScreen({navigation}) {
    return (
        <View>
            <OverlayModal
                buttonText="Agregar un usuario"
                Component={UserForm}
            />
            <UserProfileList/>
        </View>
    )
}
