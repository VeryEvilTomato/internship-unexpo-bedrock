import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Input, Text, Divider} from 'react-native-elements';
import {View, Alert} from 'react-native';

import {FORM_INIT, PROPS_CREDENTIALS} from '@constants';
import styles from '@styles';
import {authenticateUser, setUrl} from '@redux/actions';
import {saveStorageTokens} from '@utils/asyncStorage';

function submitForm(request, formState, reduxDispatch) {
  reduxDispatch(authenticateUser(formState, request, Alert)).then(token => {
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
  const [ip, setIp] = useState(request.baseURL);

  return (
    <View style={styles.container.columnBetween}>
      <View>
        <Text style={styles.font.darkLargeCentered}>
          Introduzca sus credenciales
        </Text>
        <Divider style={styles.divider.small} />
        <Divider style={styles.divider.small} />
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
          buttonStyle={styles.button.normal}
          titleStyle={styles.font.dark}
          onPress={() => submitForm(request, formState, dispatch)}
        />
      </View>

      <View>
        <Divider style={styles.divider.small} />
        <Text style={styles.font.darkNormal}>Dirección IP</Text>
        <Input
          value={ip}
          maxLength={40}
          onChangeText={text => {
            setIp(text);
          }}
        />
        <Button
          title="Actualizar IP"
          buttonStyle={styles.button.delete}
          titleStyle={styles.font.dark}
          onPress={() => {
            dispatch(setUrl(ip));
            Alert.alert('Aviso', 'Configuración correctamente actualizada');
          }}
        />
      </View>
    </View>
  );
};

export const LoginScreen = connect(state => state)(LoginScreenComponent);
