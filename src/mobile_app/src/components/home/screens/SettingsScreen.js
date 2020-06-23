import React from 'react';
import {connect} from 'react-redux';
import {Button, Text} from 'react-native-elements';
import {View, Alert} from 'react-native';

import {invalidateToken, changeOpMode} from '@redux/actions';
import {Picker} from '@react-native-community/picker';

const SettingsScreenComponent = ({request, dispatch}) => {
  return (
    <View>
      <Text>Opciones</Text>
      <Button title="Cambiar contraseña" />
      <Button
        title="Cerrar sesión"
        onPress={() => {
          Alert.alert('Advertencia', '¿Desea abandonar sesión?', [
            {
              text: 'Cancelar',
              onPress: () => {},
            },
            {
              text: 'Aceptar',
              onPress: () => {
                dispatch(invalidateToken());
              },
            },
          ]);
        }}
      />
      <View>
        <Text>Modo de operación:</Text>
        <Picker
          selectedValue={request.mode}
          style={{height: 50, width: 400}}
          onValueChange={itemValue => {
            dispatch(changeOpMode(itemValue));
          }}>
          <Picker.Item label="Red Local WiFi" value="HTTP" />
          <Picker.Item label="Mensajes de texto" value="SMS" />
        </Picker>
      </View>
    </View>
  );
};

export const SettingsScreen = connect(state => state)(SettingsScreenComponent);
