import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider, Input} from 'react-native-elements';
import {View, Alert} from 'react-native';

import {invalidateToken, setOptions} from '@redux/actions';
import styles from '@styles';

// Configuration submit handler

const configSubmitHandler = (options, dispatch) => {
  dispatch(setOptions(options, true)).then(() => {});
};

/*
 * Application configuration.
 */

const SettingsScreenComponent = ({
  request: {baseURL, baseNUMBER},
  dispatch,
}) => {
  const [options, setOptions] = useState({baseURL, baseNUMBER});

  return (
    <View style={styles.container.column}>
      <Text style={styles.font.darkLarge}>Opciones</Text>
      <Divider style={styles.divider.normal} />

      <Text style={styles.font.darkNormal}>Dirección IP</Text>
      <Input
        value={options.baseURL}
        maxLength={40}
        onChangeText={text => {
          setOptions({...options, baseURL: text});
        }}
      />
      <Text style={styles.font.darkNormal}>Número del sistema</Text>
      <Input
        value={options.baseNUMBER}
        maxLength={13}
        onChangeText={text => {
          setOptions({...options, baseNUMBER: text});
        }}
      />
      <Button
        title="Guardar"
        buttonStyle={styles.button.normal}
        titleStyle={styles.font.dark}
        icon={styles.icon.save()}
        onPress={() => {
          configSubmitHandler(options, dispatch);
        }}
      />
      <Divider style={styles.divider.normal} />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.button.delete}
        titleStyle={styles.font.dark}
        icon={styles.icon.exit()}
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
