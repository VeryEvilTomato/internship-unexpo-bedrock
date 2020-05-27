import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Input, Divider, Text} from 'react-native-elements';
import {ScrollView} from 'react-native';

import {FORM_INIT, PROPS_NEW_USER, PROPS_CREDENTIALS} from '@constants';
import {createProfile} from '@api';

function submitHandler(formState, baseURL, token, dispatch) {
  createProfile(baseURL, token, formState, dispatch).then(response => {});
}

export const UserFormScreenComponent = ({request, dispatch}) => {
  const {token, baseURL} = request;
  const [formState, setFormState] = useState({
    ...FORM_INIT.CREDENTIALS,
    ...FORM_INIT.USER,
    repeatPassword: '',
  });

  return (
    <ScrollView>
      <Text>Introduzca su nombre:</Text>
      <Input
        value={formState.first_name}
        onChangeText={text => {
          setFormState({...formState, first_name: text});
        }}
        {...PROPS_NEW_USER.BASE}
        {...PROPS_NEW_USER.NAME.FIRST}
      />
      <Text>Introduzca su apellido:</Text>
      <Input
        value={formState.last_name}
        onChangeText={text => {
          setFormState({...formState, last_name: text});
        }}
        {...PROPS_NEW_USER.BASE}
        {...PROPS_NEW_USER.NAME.LAST}
      />
      <Text>Indique su contraseña:</Text>
      <Input
        value={formState.password}
        onChangeText={text => {
          setFormState({...formState, password: text});
        }}
        {...PROPS_CREDENTIALS.PASSWORD}
      />
      <Text>Repita su contraseña:</Text>
      <Input
        value={formState.repeatPassword}
        onChangeText={text => {
          setFormState({...formState, repeatPassword: text});
        }}
        {...PROPS_CREDENTIALS.PASSWORD}
      />
      <Text>
        Su contraseña debe contener entre 10 a 30 caracteres, por lo menos una
        letra, un número y un caracter especial
      </Text>
      <Button
        title="Agregar al sistema"
        onPress={() => submitHandler(formState, baseURL, token, dispatch)}
      />
      <Divider />
    </ScrollView>
  );
};

export const UserFormScreen = connect(state => state)(UserFormScreenComponent);
