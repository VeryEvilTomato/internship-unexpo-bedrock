import React from 'react';

import {
    Button,
    Icon,
    Input,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

function submitForm(navigationProp) {
    console.log("components/login/Login.js - Logging user") 
}

export default function LoginScreen({navigation}) {
    return (
        <View>
            <Input
                placeholder='Usuario'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Contraseña'
                leftIcon={{ type: 'material', name: 'lock' }}
            />
            <Button
                title="Iniciar sesión"
                onPress={() => submitForm(navigation)}
            />
        </View>
    );
}
