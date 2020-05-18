import React from 'react';

import {
    Button,
    Icon,
    Input,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

export function UserFormScreen({navigation}) {
    return (
        <View>
            <Input
                placeholder='Nombres'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Apellidos'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Número telefónico'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Número de calle'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Manzana'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Número de casa'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Button
                title="Agregar al sistema"
                onPress={() => alert("Agregando usuario")}
            />
        </View>
    )
}
