import React, {useState} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {View, FlatList} from 'react-native';

import {PROPS_CREDENTIALS} from '@constants';

/*
 * Basic user information display.
 */

export default function PhoneNumberEditor({
  toggleOverlay,
  setIsUpdatingDetail,
  numbers,
  request,
  dispatch,
}) {
  const [newNumber, setNewNumber] = useState('');
  return (
    <View>
      <Button title="Abandonar" onPress={toggleOverlay} />
      <Input
        value={newNumber}
        onChangeText={text => {
          setNewNumber(text);
        }}
        {...PROPS_CREDENTIALS.BASE}
      />
    </View>
  );
}

/*
import React, {useState, useEffect} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {View, ScrollView, Alert, Switch} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {PROPS_NEW_USER, FORM_INIT} from '@constants';
import {createUsersdata, updateUsersdata} from '@api';

// Handling submitted data
function submitHandler(
  id,
  dataExists,
  formState,
  baseURL,
  token,
  dispatch,
  setIsUpdatingDetail,
  toggleOverlay,
) {
  // If there is no existing user data, create it.
  if (dataExists) {
    console.log('User updated');
    updateUsersdata(formState.id, baseURL, token, formState, dispatch).then(
      response => {
        setIsUpdatingDetail(true);
        toggleOverlay();
      },
    );
  } else {
    console.log('User created');
    createUsersdata(id, baseURL, token, formState, dispatch).then(response => {
      setIsUpdatingDetail(true);
      toggleOverlay();
    });
  }
}

/*
 * This component displays a form to submit/change user
 * information.
 */

/*
export default function UserDataEditor({
  toggleOverlay,
  id,
  usersdata,
  dispatch,
  request,
  setIsUpdatingDetail,
}) {
  const {baseURL, token} = request;
  const [formState, setFormState] = useState(FORM_INIT.USER_DATA);
  const toggleLocks = () =>
    setFormState({...formState, locks: !formState.locks});
  useEffect(() => {
    if (usersdata !== null) {
      setFormState(usersdata);
    }
  }, [usersdata]);

  return (
    <ScrollView>
      <Button title="Abandonar" onPress={toggleOverlay} />
      <Text>Cuenta: </Text>
      <View>
        <Text>Nivel de acceso:</Text>
        <Picker
          selectedValue={formState.accessLevel}
          style={{height: 100, width: 400}}
          onValueChange={(itemValue, itemIndex) => {
            setFormState({...formState, accessLevel: itemValue});
          }}>
          <Picker.Item label="Administrador" value="AL" />
          <Picker.Item label="Normal" value="NL" />
          <Picker.Item label="Limitado" value="LL" />
        </Picker>
        <Text>Bloqueado:</Text>
        <Switch onValueChange={toggleLocks} value={formState.locks} />
      </View>
      <Text>Información de hogar</Text>
      <View>
        <Text>Nombre de hogar:</Text>
        <Input
          value={formState.residenceName}
          onChangeText={text => {
            setFormState({...formState, residenceName: text});
          }}
          {...PROPS_NEW_USER.BASE}
        />
      </View>
      <View>
        <Text>Cuadra:</Text>
        <Input
          value={formState.streetBlockNumber}
          onChangeText={text => {
            setFormState({...formState, streetBlockNumber: text});
          }}
          {...PROPS_NEW_USER.BASE}
        />
      </View>
      <View>
        <Text>Número de hogar:</Text>
        <Input
          value={formState.homeNumber}
          onChangeText={text => {
            setFormState({...formState, homeNumber: text});
          }}
          {...PROPS_NEW_USER.BASE}
        />
      </View>
      <Text>Información de vehículo:</Text>
      <View>
        <Text>Modelo:</Text>
        <Input
          value={formState.brandModel}
          onChangeText={text => {
            setFormState({...formState, brandModel: text});
          }}
          {...PROPS_NEW_USER.BASE}
        />
      </View>
      <View>
        <Text>Placa:</Text>
        <Input
          value={formState.enrollment}
          onChangeText={text => {
            setFormState({...formState, enrollment: text});
          }}
          {...PROPS_NEW_USER.BASE}
        />
      </View>
      <View>
        <Text>Color:</Text>
        <Input
          value={formState.color}
          onChangeText={text => {
            setFormState({...formState, color: text});
          }}
          {...PROPS_NEW_USER.BASE}
        />
      </View>
      <Button
        title="Editar información"
        onPress={() => {
          const dataExists = usersdata === null ? false : true;
          submitHandler(
            id,
            dataExists,
            formState,
            baseURL,
            token,
            dispatch,
            setIsUpdatingDetail,
            toggleOverlay,
          );
        }}
      />
    </ScrollView>
  );
}
*/
