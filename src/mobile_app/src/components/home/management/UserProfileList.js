import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import UserProfile from './UserProfile';
import {funnel} from '@api';
import styles from '@styles';

/*
 * List displaying each profile included
 * in the system.
 */

const UserProfileListComponent = ({request, navigation, dispatch}) => {
  const {baseURL, token, mode} = request;
  const [userDataList, setUserDataList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      funnel(mode)
        .requestAllProfiles(baseURL, token, dispatch)
        .then(response => {
          setUserDataList(response.data);
        })
        .catch(() => {});
    }, [baseURL, dispatch, mode, token]),
  );

  return (
    <View style={styles.card.scroll}>
      <Text style={[styles.font.dark, styles.font.margin]}>
        Lista de perfiles:
      </Text>
      {userDataList.length > 0 ? <View /> : <Text>Cargando...</Text>}
      <FlatList
        data={userDataList}
        renderItem={({item}) => (
          <UserProfile profile={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id.toString()}
        extraData={userDataList}
      />
    </View>
  );
};

export const UserProfileList = connect(state => state)(
  UserProfileListComponent,
);
