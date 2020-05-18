import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

import GateButton from '../GateButton';
import UserBoard from '../UserBoard';

import { decodeJWT } from '../../../redux/actions';

const Drawer = createDrawerNavigator()

function navigationHandler(option, navigation) {
    switch (option) {
        case "USER_MANAGEMENT":
            navigation.navigate("Management");
            break;
        case "OPTIONS":
            navigation.navigate("Settings");
            break;
    }
}

const HomeScreenComponent = ({request, dispatch, navigation}) => {
    let { user_id } = request;
    useEffect(() => { dispatch(decodeJWT()) }, []);

    return (
        <View>
            {
                (user_id === null) ? 
                    ( <Text>Cargando perfil...</Text> )
                    : 
                    ( <UserBoard user_id={user_id}/> )
            }
            <GateButton/>
            <Button
                title="Gestión de usuarios"
                onPress={() => navigationHandler("USER_MANAGEMENT", navigation)}
            />
            <Button
                title="Opciones"
                onPress={() => navigationHandler("OPTIONS", navigation)}
            />
        </View>
    )
}

export const HomeScreen = connect(state => state)(HomeScreenComponent)
