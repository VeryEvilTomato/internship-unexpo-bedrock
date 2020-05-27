import React from 'react';
import {connect} from 'react-redux';

import {Button, Text} from 'react-native-elements';

import {View, Alert} from 'react-native';

import {invalidateToken} from '@redux/actions';

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
    </View>
  );
};

export const SettingsScreen = connect(state => state)(SettingsScreenComponent);
