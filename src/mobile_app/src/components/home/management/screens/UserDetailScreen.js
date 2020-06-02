import React, {useEffect, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Text, Button, Divider} from 'react-native-elements';
import {View, BackHandler} from 'react-native';

import {FORM_INIT} from '@constants';
import {requestProfile} from '@api';
import {accessLevelToText} from '@utils';
import {OverlayModal} from '@containers';
import UserDataEditor from '../UserDataEditor';
import PhoneNumberEditor from '../PhoneNumberEditor';

/*
 * Screen to display and request all data from a specific profile.
 */

const UserDetailScreenComponent = ({
  request,
  dispatch,
  navigation,
  route: {params},
}) => {
  const {baseURL, token} = request;
  const {id} = params;
  const [userState, setUserState] = useState(FORM_INIT.USER);
  const [isUpdatingDetail, setIsUpdatingDetail] = useState(true);
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
  // Re-request user information.
  useFocusEffect(
    useCallback(() => {
      if (isUpdatingDetail) {
        requestProfile(id, baseURL, token)
          .then(response => {
            // Set user information & numbers
            setUserState(response.data);
            setIsUpdatingDetail(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [isUpdatingDetail, id, baseURL, token]),
  );
  return (
    <View>
      <View>
        <Text>
          Usuario: {userState.username} Nombre: {userState.first_name}{' '}
          {userState.last_name}
        </Text>
      </View>
      <Divider />

      <View>
        {userState.usersdata === null ? (
          <View />
        ) : (
          <View>
            <Text>Informacion</Text>
            <Text>
              Estatus: {userState.usersdata.locks ? 'Bloqueado' : 'Activo'}
            </Text>
            <Text>
              Nivel de acceso:{' '}
              {accessLevelToText(userState.usersdata.accessLevel)}
            </Text>
            <Text>Nombre de hogar: {userState.usersdata.residenceName}</Text>
            <Text>Cuadra: {userState.usersdata.streetBlockNumber}</Text>
            <Text>N° de hogar: {userState.usersdata.homeNumber}</Text>
            <Text>Modelo: {userState.usersdata.brandModel}</Text>
            <Text>Placa: {userState.usersdata.enrollment}</Text>
            <Text>Color: {userState.usersdata.color}</Text>
          </View>
        )}
        <OverlayModal
          buttonText="Editar información personal"
          Component={UserDataEditor}
          props={{
            id,
            usersdata: userState.usersdata,
            dispatch,
            request,
            setIsUpdatingDetail,
          }}
        />
      </View>
      <Divider />

      <View>
        {userState.nums.length < 1 ? (
          <View />
        ) : (
          <View>
            <Text>Numeros</Text>
            {userState.nums.map((phone, index) => (
              <View key={index}>
                <Text>{phone.number}</Text>
              </View>
            ))}
          </View>
        )}
        <OverlayModal
          buttonText="Agregar número"
          Component={PhoneNumberEditor}
          props={{
            id,
            dispatch,
            request,
            setIsUpdatingDetail,
            numbers: userState.nums,
          }}
        />
      </View>
      <Divider />
    </View>
  );
};

export const UserDetailScreen = connect(state => state)(
  UserDetailScreenComponent,
);
