import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Input, Divider, Text} from 'react-native-elements';
import {ScrollView} from 'react-native';

import {FORM_INIT, PROPS_NEW_USER, PROPS_CREDENTIALS} from '@constants';
import {funnel} from '@api';
import {STATUS} from '@constants';
import styles from '@styles';

function submitHandler(formState, baseURL, token, dispatch, navigation, mode) {
  funnel(mode)
    .createProfile(baseURL, token, formState, dispatch)
    .then(response => {
      switch (response.status) {
        case STATUS.SUCCESS:
          navigation.navigate('UserDetail', {
            ...response.data,
            recentlyCreated: true,
          });
          break;
        case STATUS.ERROR:
          alert(JSON.stringify(response.data)); // DEBUG
          break;
      }
    })
    .catch(error => console.log(error));
}

export const UserFormScreenComponent = ({request, dispatch, navigation}) => {
  const {token, baseURL, mode} = request;
  const [formState, setFormState] = useState({
    ...FORM_INIT.CREDENTIALS,
    ...FORM_INIT.USER,
    repeatPassword: '',
  });

  return (
    <ScrollView style={styles.container.columnScroll}>
      <Text style={styles.font.dark}>Introduzca su nombre:</Text>
      <Input
        value={formState.first_name}
        onChangeText={text => {
          setFormState({...formState, first_name: text});
        }}
        {...PROPS_NEW_USER.BASE}
        {...PROPS_NEW_USER.NAME.FIRST}
      />
      <Text style={styles.font.dark}>Introduzca su apellido:</Text>
      <Input
        value={formState.last_name}
        onChangeText={text => {
          setFormState({...formState, last_name: text});
        }}
        {...PROPS_NEW_USER.BASE}
        {...PROPS_NEW_USER.NAME.LAST}
      />
      <Text style={styles.font.dark}>Indique su contraseña:</Text>
      <Input
        value={formState.password}
        onChangeText={text => {
          setFormState({...formState, password: text});
        }}
        {...PROPS_CREDENTIALS.PASSWORD}
      />
      <Text style={styles.font.dark}>Repita su contraseña:</Text>
      <Input
        value={formState.repeatPassword}
        onChangeText={text => {
          setFormState({...formState, repeatPassword: text});
        }}
        {...PROPS_CREDENTIALS.PASSWORD}
      />
      <Text style={styles.font.darkNormal}>
        Su contraseña debe contener entre 10 a 20 caracteres, por lo menos una
        letra y un número.
      </Text>
      <Button
        buttonStyle={styles.button.normal}
        titleStyle={styles.font.dark}
        title="Agregar al sistema"
        onPress={() =>
          submitHandler(formState, baseURL, token, dispatch, navigation, mode)
        }
      />
      <Divider style={styles.divider.normal} />
    </ScrollView>
  );
};

export const UserFormScreen = connect(state => state)(UserFormScreenComponent);
