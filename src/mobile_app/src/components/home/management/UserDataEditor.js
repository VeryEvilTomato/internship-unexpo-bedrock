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
) {
  // If there is no existing user data, create it.
  if (dataExists) {
    updateUsersdata(formState.id, baseURL, token, formState, dispatch).then(
      response => {
        setIsUpdatingDetail(true);
      },
    );
  } else {
    createUsersdata(id, baseURL, token, formState, dispatch).then(response => {
      setIsUpdatingDetail(true);
    });
  }
}

/*
 * This component displays a form to submit/change user
 * information.
 */

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
          style={{height: 50, width: 400}}
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
          {...PROPS_NEW_USER.HOME.NAME}
        />
      </View>
      <View>
        <Text>Cuadra:</Text>
        <Input
          value={formState.streetBlockNumber}
          onChangeText={text => {
            setFormState({...formState, streetBlockNumber: text});
          }}
          {...PROPS_NEW_USER.HOME.BLOCK}
        />
      </View>
      <View>
        <Text>Número de hogar:</Text>
        <Input
          value={formState.homeNumber}
          onChangeText={text => {
            setFormState({...formState, homeNumber: text});
          }}
          {...PROPS_NEW_USER.HOME.NUMBER}
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
          {...PROPS_NEW_USER.CAR.BRAND}
        />
      </View>
      <View>
        <Text>Placa:</Text>
        <Input
          value={formState.enrollment}
          onChangeText={text => {
            setFormState({...formState, enrollment: text.toUpperCase()});
          }}
          {...PROPS_NEW_USER.CAR.ENROLLMENT}
        />
      </View>
      <View>
        <Text>Color:</Text>
        <Input
          value={formState.color}
          onChangeText={text => {
            setFormState({...formState, color: text});
          }}
          {...PROPS_NEW_USER.CAR.COLOR}
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
          );
        }}
      />
    </ScrollView>
  );
}
