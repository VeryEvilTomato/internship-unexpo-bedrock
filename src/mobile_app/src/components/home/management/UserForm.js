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
            <Input
                value={formState.residenceName}
                onChangeText = {(text) => { setFormState({ ...formState, residenceName: text} )}}
                {...PROPS_NEW_USER.BASE}
            />
            <Input
                value={formState.homeNumber}
                onChangeText = {(text) => { setFormState({ ...formState, homeNumber: text} )}}
                {...PROPS_NEW_USER.BASE}
            />
            <Input
                value={formState.streetBlockNumber}
                onChangeText = {(text) => { setFormState({ ...formState, streetBlockNumber: text} )}}
                {...PROPS_NEW_USER.BASE}
            />
            <Input
                value={formState.phoneNumber}
                onChangeText = {(text) => { setFormState({ ...formState, phoneNumber: text} )}}
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
