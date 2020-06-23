import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import UserProfile from './UserProfile';
import {funnel} from '@api';

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
          if (response !== null) {
            setUserDataList(response.data.results);
          }
        });
    }, [baseURL, dispatch, mode, token]),
  );

  return (
    <View style={{height: 500}}>
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
