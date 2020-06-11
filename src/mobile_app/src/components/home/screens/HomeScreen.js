import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {GateButton} from '../GateButton';
import {UserBoard} from '../UserBoard';
import {funnel, allowedModes} from '@api';
import {FORM_INIT} from '@constants';

/*
 * Loads basic user information, to be displayed
 * on the profile board alongside access to the
 * different application features.
 *
 * Depending of your access level the client
 * might or not be exposed to certain features.
 */

const HomeScreenComponent = ({request, dispatch, navigation}) => {
  const {userId, baseURL, token, mode} = request;
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    ...FORM_INIT.USER,
    usersdata: FORM_INIT.USER_DATA,
  });
  // Requests user profile, if received, the access level is checked.
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        funnel(mode)
          .requestProfile(userId, baseURL, token, dispatch)
          .then(response => {
            if (response !== undefined) {
              const {data} = response;
              setUser(data);
              if (data.usersdata !== null) {
                setIsAdmin(data.usersdata.accessLevel === 'AL' ? true : false);
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [baseURL, dispatch, mode, token, userId]),
  );

  return (
    <View>
      {allowedModes.profiles.includes(mode) && userId !== null ? (
        <UserBoard userData={user} isAdmin={isAdmin} />
      ) : (
        <View />
      )}
      {allowedModes.gate.includes(mode) ? (
        <GateButton userData={user} />
      ) : (
        <View />
      )}
      <Divider />
      {isAdmin && allowedModes.profiles.includes(mode) ? (
        <Button
          title="Gestión de usuarios"
          onPress={() => navigation.navigate('UserManagement')}
        />
      ) : (
        <View />
      )}
      <Button
        title="Opciones"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export const HomeScreen = connect(state => state)(HomeScreenComponent);
