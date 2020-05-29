import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {View, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import UserProfile from './UserProfile';
import {requestAllProfiles} from '@api';

/*
 * List displaying each profile included
 * in the system.
 */

const UserProfileListComponent = ({request, navigation}) => {
  const {baseURL, token} = request;
  const [userDataList, setUserDataList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      requestAllProfiles(baseURL, token).then(response => {
        setUserDataList(response.data.results);
      });
    }, [baseURL, token]),
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
