import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

import { INPUT } from '../../constants'
import { authenticateUser } from '../../redux/actions'

import {
    Button,
    Icon,
    Input,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

function formInit( 
    defaultData = {
        username: '',
        password: '',
    }) {
    return defaultData;
}

function formReducer(state, action) {
    switch(action.type) {
        case INPUT.USER:
            return {...state, username: action.payload};
        case INPUT.PASSWORD:
            return {...state, password: action.payload};
        case INPUT.RESET:
            return formInit();
    }
}

function formHandler(action, formDispatch, navigation) {
    if(navigation.isFocused()) formDispatch(action);
}

function submitForm(navigationProp, formData, formDispatch, reduxDispatch) {
    reduxDispatch(authenticateUser(formData));
}

const LoginScreenComponent = ({request, dispatch, navigation}) => {
    const [formState, formDispatch] = useReducer(formReducer, formInit())

    if(request.isLoading) navigation.navigate('Splash');

    return (
        <View>
            <Input
                placeholder='Usuario'
                value={formState.user}
                autoCorrect={false}
                onChangeText = {(text) => { 
                    formHandler(
                        {
                            type: INPUT.USER, 
                            payload: text
                        },
                        formDispatch,
                        navigation
                )}}
                maxLength={15}
                leftIcon={{ type: 'material', name: 'face' }}
            />
            <Input
                placeholder='Contraseña'
                value={formState.password}
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText = {(text) => { 
                    formHandler(
                        {
                            type: INPUT.PASSWORD, 
                            payload: text
                        },
                        formDispatch,
                        navigation
                )}}
                maxLength={30}
                leftIcon={{ type: 'material', name: 'lock' }}
            />
            <Button
                title="Iniciar sesión"
                onPress={() => submitForm(
                    navigation, 
                    formState, 
                    formDispatch,
                    dispatch,
                )}
            />
        </View>
    );
}

export const LoginScreen = connect((state) => state)(LoginScreenComponent);
