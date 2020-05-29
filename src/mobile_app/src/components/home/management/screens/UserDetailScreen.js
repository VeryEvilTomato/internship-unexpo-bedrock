import React, {useEffect, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Text, Button} from 'react-native-elements';
import {View, BackHandler} from 'react-native';

import {FORM_INIT} from '@constants';

/*
 * Screen to display and request all data from a specific profile.
 */

const UserDetailScreenComponent = ({request, navigation, route: {params}}) => {
  const [userData, setUserData] = useState(FORM_INIT.USER_DATA);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  // Override back button functionality so it appropiately works with
  // the UI. This comes handy when a profile has been recently created.
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (params.recentlyCreated) {
          navigation.pop(2);
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, params.recentlyCreated]),
  );
  // Request all necessary API calls to display the user's information.
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
      <Button
        title="Regresar"
        onPress={() => {
          navigation.navigate('UserList');
        }}
      />
    </View>
  );
};

export const UserDetailScreen = connect(state => state)(
  UserDetailScreenComponent,
);
