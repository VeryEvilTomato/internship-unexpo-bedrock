import React, { useState } from 'react';

import {
    Button,
    Icon,
    Input,
    Divider,
} from 'react-native-elements';

import {
    ScrollView,
} from 'react-native';

import { FORM_INIT, PROPS_NEW_USER } from '@constants'

export const UserForm = ({toggleOverlay}) => {
    const [formState, setFormState] = useState(FORM_INIT.NEW_USER);
    const [errorState, setErrorState] = useState([]);

    return (
        <ScrollView>
            <Input
                value={formState.first_name}
                onChangeText = {(text) => { setFormState({ ...formState, first_name: text} )}}
                {...PROPS_NEW_USER.BASE}
            />
            <Input
                value={formState.last_name}
                onChangeText = {(text) => { setFormState({ ...formState, last_name: text} )}}
                {...PROPS_NEW_USER.BASE}
            />
            <Button
                title="Agregar al sistema"
                onPress={() => alert("Agregando usuario")}
            />
            <Divider/>
            <Button
                title="Abandonar"
                onPress={toggleOverlay}
            />
        </ScrollView>
    )
}
