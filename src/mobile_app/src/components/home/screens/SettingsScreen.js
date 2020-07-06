import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {View, Alert} from 'react-native';

import {invalidateToken} from '@redux/actions';
import styles from '@styles';

const SettingsScreenComponent = ({request, dispatch}) => {
  return (
    <View style={styles.container.column}>
      <Text style={styles.font.darkLarge}>Opciones</Text>
      <Divider style={styles.divider.normal} />
      <Button
        title="Cambiar contraseña"
        buttonStyle={styles.button.normal}
        titleStyle={styles.font.dark}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.button.normal}
        titleStyle={styles.font.dark}
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
