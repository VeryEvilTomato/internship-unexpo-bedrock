import React, {useState} from 'react';
import {Button, Text, Input, Divider} from 'react-native-elements';
import {View, Alert} from 'react-native';

import {PROPS_CREDENTIALS} from '@constants';
import {funnel} from '@api';
import styles from '@styles';

// Handling submitted data
function submitHandler(
  user_id,
  newNumber,
  baseURL,
  token,
  dispatch,
  setIsUpdatingDetail,
  toggleOverlay,
) {
  if (newNumber.length !== 12) {
    Alert.alert('', 'Escriba su número telefónico completo', [
      {text: 'Continuar', onPress: () => {}},
    ]);
  }
  const data = newNumber.slice(1, 4) + newNumber.slice(5);
  funnel('HTTP')
    .createNumber(user_id, baseURL, token, data, dispatch)
    .then(response => {
      setIsUpdatingDetail(true);
      toggleOverlay();
    });
}

/*
 * Basic user information display.
 */

export default function PhoneNumberEditor({
  id,
  toggleOverlay,
  setIsUpdatingDetail,
  request,
  dispatch,
}) {
  const {baseURL, token} = request;
  const [newNumber, setNewNumber] = useState('');
  return (
    <View>
      <Button
        title="Abandonar"
        onPress={toggleOverlay}
        buttonStyle={styles.button.delete}
        titleStyle={styles.font.dark}
      />
      <Text style={styles.font.darkLargeCentered}>Ingrese el número:</Text>
      <Input
        value={newNumber}
        placeholder="Escriba su número aquí"
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
      <Text style={styles.font.darkNormal}>
        Ejemplo: '04241110000', '04162220000'
      </Text>
      <Divider style={styles.divider.small} />
      <Button
        title="Agregar al usuario"
        buttonStyle={styles.button.normal}
        titleStyle={styles.font.dark}
        onPress={() => {
          submitHandler(
            id,
            newNumber,
            baseURL,
            token,
            dispatch,
            setIsUpdatingDetail,
            toggleOverlay,
          );
        }}
      />
    </View>
  );
}
