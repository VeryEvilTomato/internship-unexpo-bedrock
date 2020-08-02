import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Button, Text, Divider} from 'react-native-elements';
import {View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {GateButton} from '../GateButton';
import {UserBoard} from '../UserBoard';
import {funnel, allowedModes} from '@api';
import {FORM_INIT} from '@constants';
import styles from '@styles';

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
  const [isBlocked, setIsBlocked] = useState(false);
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
              setUser({...data, error: false});
              setIsAdmin(data.is_staff);
              setIsBlocked(data.usersdata.locks);
            }
          })
          .catch(error => {
            setUser({error: true});
          });
      }
    }, [baseURL, dispatch, mode, token, userId]),
  );

  return (
    <View style={styles.container.columnBetween}>
      <View>
        {allowedModes.profiles.includes(mode) && userId !== null ? (
          <UserBoard userData={user} isAdmin={isAdmin} />
        ) : (
          <View />
        )}
        {allowedModes.gate.includes(mode) && !isBlocked ? (
          <GateButton userData={user} />
        ) : (
          <View />
        )}
        <Divider style={styles.divider.normal} />
      </View>
      <View style={styles.container.columnBetween}>
        <View>
          {isAdmin && !isBlocked ? (
            <Button
              title="Gestión de usuarios"
              onPress={() => navigation.navigate('UserManagement')}
              icon={styles.icon.contactList()}
              buttonStyle={styles.button.normal}
              titleStyle={styles.font.dark}
              disabled={!allowedModes.profiles.includes(mode)}
            />
          ) : (
            <View />
          )}
          {!isBlocked ? (
            <Button
              title="Registros de apertura"
              onPress={() => navigation.navigate('LogTracker')}
              icon={styles.icon.logTracker()}
              buttonStyle={styles.button.normal}
              titleStyle={styles.font.dark}
              disabled={!allowedModes.profiles.includes(mode)}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={styles.container.rowStart}>
          <Button
            onPress={() => navigation.navigate('Settings')}
            icon={styles.icon.settingsButton()}
            buttonStyle={styles.button.icon}
            containerStyle={styles.container.spacingCenter}
            titleStyle={styles.font.dark}
          />
          {/*
          <View style={styles.card.large}>
            <Text style={styles.font.darkMargin}>Modo de operación</Text>
            <Picker
              selectedValue={request.mode}
              onValueChange={itemValue => {
                dispatch(changeOpMode(itemValue));
              }}>
              <Picker.Item label="Red Local WiFi" value="HTTP" />
              <Picker.Item label="Mensajes de texto" value="SMS" />
            </Picker>
          </View>
          */}
        </View>
      </View>
    </View>
  );
};

export const HomeScreen = connect(state => state)(HomeScreenComponent);
