import React, {useState} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {View, FlatList, Alert} from 'react-native';

import {PROPS_CREDENTIALS} from '@constants';
import {createNumber} from '@api';

// Handling submitted data
function submitHandler(
  user_id,
  newNumber,
  baseURL,
  token,
  dispatch,
  setIsUpdatingDetail,
) {
  if (newNumber.length !== 12) {
    Alert.alert('', 'Escriba su número telefónico completo', [
      {text: 'Continuar', onPress: () => {}},
    ]);
  }
  const data = newNumber.slice(1, 4) + newNumber.slice(5);
  createNumber(user_id, baseURL, token, data, dispatch).then(response => {
    console.log(response);
    setIsUpdatingDetail(true);
  });
}

/*
 * Basic user information display.
 */

export default function PhoneNumberEditor({
  id,
  toggleOverlay,
  setIsUpdatingDetail,
  numbers,
  request,
  dispatch,
}) {
  const {baseURL, token} = request;
  const [newNumber, setNewNumber] = useState('');
  return (
    <View>
      <Button title="Abandonar" onPress={toggleOverlay} />
      <Text>Ingrese el número:</Text>
      <Input
        value={newNumber}
        onChangeText={text => {
          if (text.length > 5) {
            text = text.slice(0, 4) + text.slice(5);
          } else if (text.length === 5 && text[4] === '-') {
            text = text.slice(0, 4);
          }
          if (text.match('^[0-9]{0,11}$')) {
            if (text.length > 4) {
              text = text.slice(0, 4) + '-' + text.slice(4);
            }
            setNewNumber(text);
          }
        }}
        maxLength={12}
        keyboardType="phone-pad"
        {...PROPS_CREDENTIALS.PHONE_NUMBER}
      />
      <Text>Ejemplo: '04241110000', '04162220000'</Text>
      <Button
        title="Agregar al usuario"
        onPress={() => {
          submitHandler(
            id,
            newNumber,
            baseURL,
            token,
            dispatch,
            setIsUpdatingDetail,
          );
        }}
      />
    </View>
  );
}
