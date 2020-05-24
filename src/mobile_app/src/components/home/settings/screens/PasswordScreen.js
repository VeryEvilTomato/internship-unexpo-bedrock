import React from 'react';

import {
    Button,
    Text,
    Input,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

export function PasswordScreen() {
    return (
        <View>
            <Text>Introduzca su contraseña antigua:</Text>
            <Input
                placeholder='Anterior'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Text>Contraseña nueva:</Text>
            <Input
                placeholder='Nueva'
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Button
                title="Cambiar contraseña"
                onPress={() => alert("Contraseña cambiada")}
            />
        </View>
    )
}

/*
 { 
                loginState.errors !== null ?
                loginState.errors.map((error, index) => {
                    let title = error.type == INPUT.USER ? "Nombre de usuario:" : "Contraseña:";
                    return (
                        <View key={index}> 
                            <Text h4>{ title }</Text>
                            { error.errors.map((message, index) => 
                                <Text key={index}> - { message }</Text>) 
                            }
                        </View>
                        )
                    }) 
                :
                ""
            }

function submitForm(navigationProp, loginData, loginDispatch) {
    let formData = [
        { type: INPUT.USER, string: loginData.user.toLowerCase() },
        { type: INPUT.PASSWORD, string: loginData.password },
    ]
    let errors = inputValidation(formData);
    if (errors) { 
        loginDispatch({type: INPUT.ERROR, payload: errors});
        return;
    };

    loginDispatch({ type: INPUT.RESET })
}

*/
