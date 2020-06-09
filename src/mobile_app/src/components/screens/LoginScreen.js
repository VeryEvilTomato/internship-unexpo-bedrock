import React, {useState} from 'react';
import {connect} from 'react-redux';

import {Button, Input} from 'react-native-elements';

import {View} from 'react-native';

import {FORM_INIT, PROPS_CREDENTIALS} from '@constants';
import {authenticateUser} from '@redux/actions';
import {saveStorageTokens} from '@utils/asyncStorage';

function submitForm(request, formState, reduxDispatch) {
  reduxDispatch(authenticateUser(formState, request)).then(token => {
    saveStorageTokens(token);
  });
}

const LoginScreenComponent = ({request, dispatch}) => {
  // Debug
  const [formState, setFormState] = useState({
    username: 'orlando',
    password: '88905django',
  });
  // const [formState, setFormState] = useState(FORM_INIT.CREDENTIALS);

  return (
    <View>
      <Input
        value={formState.username}
        onChangeText={text => {
          setFormState({...formState, username: text});
        }}
        {...PROPS_CREDENTIALS.USERNAME}
      />
      <Input
        value={formState.password}
        onChangeText={text => {
          setFormState({...formState, password: text});
        }}
        {...PROPS_CREDENTIALS.PASSWORD}
      />
      <Button
        title="Iniciar sesión"
        onPress={() => submitForm(request, formState, dispatch)}
      />
    </View>
  );
};

export const LoginScreen = connect(state => state)(LoginScreenComponent);
