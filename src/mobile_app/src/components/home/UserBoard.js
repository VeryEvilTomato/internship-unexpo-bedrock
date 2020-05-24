import React, { useEffect } from 'react';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

/*
 * Active session user information componen
*/

export default function UserBoard({ userData }) {
    let { first_name, last_name, is_staff } = userData;

    useEffect(() => {}, [])

    return (
        <View>
            <Text>¡Bienvenid@ {first_name} {last_name}!</Text>
            {
                is_staff ?
                    ( <Text>Usted posee derechos de administrador</Text> )
                    :
                    ( <View></View> )
            }
        </View>
    )
}
