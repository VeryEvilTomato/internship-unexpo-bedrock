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

export default function UserBoard({ user_id }) {
    useEffect(() => {}, [])

    return (
        <View>
            <Text>ID de Usuario: {user_id}</Text>
        </View>
    )
}