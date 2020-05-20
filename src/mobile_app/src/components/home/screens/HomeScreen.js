import React, { useEffect, useState } from 'react';
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
import { decodeJWT, invalidateToken } from '@redux/actions';
import { requestProfile } from '@api'

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
    const { userId, baseURL, token } = request;
    const [ userData, setUserData ] = useState({});
    let profileData = null;

    useEffect(() => {
        if (userId) { 
            requestProfile(
                userId, 
                baseURL, 
                token
            ).then((response) => {
                setUserData(response.data);
            }).catch((error) => {
                dispatch(invalidateToken());
            })
        };
    }, [userId])

    return (
        <View>
            {
                (userId === null) ? 
                    ( <Text>Cargando perfil...</Text> )
                    : 
                    ( <UserBoard userData={userData}/> )
            }
            <GateButton/>
            {
                (userData.is_staff) ? 
                    (   <Button
                            title="Gestión de usuarios"
                            onPress={() => navigationHandler("USER_MANAGEMENT", navigation)}
                        /> 
                    )
                    : 
                    ( <View></View> )
            }
            <Button
                title="Opciones"
                onPress={() => navigationHandler("OPTIONS", navigation)}
            />
        </View>
    )
}

export const HomeScreen = connect(state => state)(HomeScreenComponent)
