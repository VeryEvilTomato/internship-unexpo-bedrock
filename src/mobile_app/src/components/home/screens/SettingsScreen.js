import React from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

import { invalidateToken } from '@redux/actions';

const SettingsScreenComponent = ({request, dispatch, navigation}) => {
    return (
        <View>
            <Text>Opciones</Text>
            <Button
                title="Cambiar contraseña"
                onPress={() => navigation.navigate("PasswordReset")}
            />
            <Button
                title="Cerrar sesión"
                onPress={() => dispatch(invalidateToken())}
            />
        </View>
    )
}

export const SettingsScreen = connect(state => state)(SettingsScreenComponent);
