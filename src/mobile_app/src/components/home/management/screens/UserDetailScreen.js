import React, {useEffect, useCallback, useState} from 'react';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Text, Button, Divider} from 'react-native-elements';
import {View, ScrollView, BackHandler, Alert} from 'react-native';

import {FORM_INIT} from '@constants';
import {funnel} from '@api';
import {accessLevelToText} from '@utils';
import styles from '@styles';
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
  const {baseURL, token, mode} = request;
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
        funnel(mode)
          .requestProfile(id, baseURL, token, dispatch)
          .then(response => {
            // Set user information & numbers
            setUserState(response.data);
            setIsUpdatingDetail(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [isUpdatingDetail, mode, id, baseURL, token, dispatch]),
  );

  return (
    <ScrollView
      style={styles.container.columnScroll}
      nestedScrollEnabled={true}>
      <View>
        <Text>
          <Text style={styles.font.dark}>Usuario: </Text>
          <Text style={styles.font.darkNormal}>
            {userState.username}{' '}
          </Text>/ <Text style={styles.font.dark}>Nombre: </Text>
          <Text style={styles.font.darkNormal}>
            {userState.first_name} {userState.last_name}
          </Text>
        </Text>
      </View>
      <Divider style={styles.divider.normal} />

      <View>
        {userState.usersdata === null ? (
          <Text style={styles.font.darkNormal}>
            No existe información almacenada para este usuario
          </Text>
        ) : (
          <View>
            <Text style={styles.font.darkLargeCentered}>Informacion</Text>
            <Text style={styles.font.dark}>
              Estatus:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.locks ? 'Bloqueado' : 'Activo'}
              </Text>
            </Text>

            <Text style={styles.font.dark}>
              Nivel de acceso:{' '}
              <Text style={styles.font.darkNormal}>
                {accessLevelToText(userState.usersdata.accessLevel)}
              </Text>
            </Text>
            <Divider style={styles.divider.small} />
            <Text style={styles.font.darkLargeCentered}>Hogar</Text>
            <Text style={styles.font.dark}>
              Nombre:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.residenceName}
              </Text>
            </Text>
            <Text style={styles.font.dark}>
              Cuadra:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.streetBlockNumber}
              </Text>
            </Text>
            <Text style={styles.font.dark}>
              N° Hogar:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.homeNumber}
              </Text>
            </Text>
            <Divider style={styles.divider.small} />
            <Text style={styles.font.darkLargeCentered}>Automóvil</Text>
            <Text style={styles.font.dark}>
              Modelo:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.brandModel}
              </Text>
            </Text>
            <Text style={styles.font.dark}>
              Placa:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.enrollment}
              </Text>
            </Text>
            <Text style={styles.font.dark}>
              color:{' '}
              <Text style={styles.font.darkNormal}>
                {userState.usersdata.color}
              </Text>
            </Text>
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

      <Divider style={styles.divider.normal} />
      <View>
        {userState.nums.length < 1 ? (
          <Text style={styles.font.darkNormal}>
            No existen números telefónicos registrados para este usuario
          </Text>
        ) : (
          <View>
            <Text style={styles.font.darkLargeCentered}>
              Números telefónicos
            </Text>
            <ScrollView
              style={styles.card.scrollFixed}
              nestedScrollEnabled={true}>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'flex-start',
                  flexWrap: 'wrap',
                }}>
                {userState.nums.map((phone, index) => (
                  <View key={index}>
                    <Button
                      title={phone.number}
                      icon={styles.icon.delete()}
                      buttonStyle={styles.button.smallIcon}
                      onPress={() => {
                        numberDeleteHandler(
                          phone.id,
                          baseURL,
                          token,
                          dispatch,
                          setIsUpdatingDetail,
                          mode,
                        );
                      }}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
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

      <Divider style={styles.divider.normal} />
      <Button
        title="Eliminar perfil"
        buttonStyle={styles.button.delete}
        icon={styles.icon.delete()}
        titleStyle={styles.font.dark}
        onPress={() => {
          ProfileDeleteHandler(id, baseURL, token, dispatch, navigation, mode);
        }}
      />
    </ScrollView>
  );
};

export const UserDetailScreen = connect(state => state)(
  UserDetailScreenComponent,
);

// Handlers

function ProfileDeleteHandler(
  userId,
  baseURL,
  token,
  dispatch,
  navigation,
  mode,
) {
  Alert.alert(
    'Advertencia',
    'Esta acción es irrecuperable ¿Seguro que de sea eliminar el perfil?',
    [
      {
        text: 'Aceptar',
        onPress: () => {
          funnel(mode)
            .deleteProfile(userId, baseURL, token, dispatch)
            .then(response => {
              navigation.navigate('UserList');
            });
        },
      },
      {text: 'Cancelar', onPress: () => {}},
    ],
  );
}

function numberDeleteHandler(
  numberId,
  baseURL,
  token,
  dispatch,
  setIsUpdatingDetail,
  mode,
) {
  Alert.alert('Advertencia', '¿Seguro que desea eliminar el número?', [
    {
      text: 'Aceptar',
      onPress: () => {
        funnel(mode)
          .deleteNumber(numberId, baseURL, token, dispatch)
          .then(response => {
            setIsUpdatingDetail(true);
          });
      },
    },
    {text: 'Regresar', onPress: () => {}},
  ]);
}
