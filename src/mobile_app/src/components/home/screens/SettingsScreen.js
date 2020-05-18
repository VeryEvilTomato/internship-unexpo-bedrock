import React from 'react';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

export function SettingsScreen({navigation}) {
    return (
        <View>
            <Text>Opciones</Text>
            <Button
                title="Cambiar contraseña"
                onPress={() => navigation.navigate("PasswordReset")}
            />
        </View>
    )
}