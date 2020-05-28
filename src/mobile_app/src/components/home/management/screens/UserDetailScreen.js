import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {Text} from 'react-native-elements';
import {View} from 'react-native';

const UserDetailScreenComponent = ({
  request,
  dispatch,
  navigation,
  route: {params},
}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', e => {
      // TO-DO Request numbers & userdata
    });
    return unsubscribe;
  });
  return (
    <View>
      <View user>
        <Text>
          Nombre: {params.first_name} {params.last_name}
        </Text>
      </View>
      <View userdata>
        <Text>Informacion de usuario:</Text>
        {true ? <Text>Cargando...</Text> : <View />}
      </View>
      <View numeros>
        <Text>Numero(s) telefónico:</Text>
        {true ? <Text>Cargando...</Text> : <View />}
      </View>
    </View>
  );
};

export const UserDetailScreen = connect(state => state)(
  UserDetailScreenComponent,
);
