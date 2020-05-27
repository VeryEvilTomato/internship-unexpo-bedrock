import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {Text} from 'react-native-elements';

import {View, FlatList} from 'react-native';

import UserProfile from './UserProfile';
import {requestAllProfiles} from '@api';

const UserProfileListComponent = ({request, dispatch, navigation}) => {
  const {baseURL, token} = request;
  const [userDataList, setUserDataList] = useState([]);

  useEffect(() => {
    if (navigation.isFocused()) {
      setUserDataList([]);
      requestAllProfiles(baseURL, token).then(response => {
        setUserDataList(response.data.results);
      });
    }
  }, [baseURL, dispatch, navigation, token]);

  return (
    <View style={{height: 500}}>
      {userDataList.length > 0 ? <View /> : <Text>Cargando...</Text>}
      <FlatList
        data={userDataList}
        renderItem={({item}) => <UserProfile profile={item} />}
        keyExtractor={item => item.id.toString()}
        extraData={userDataList}
      />
    </View>
  );
};

export const UserProfileList = connect(state => state)(
  UserProfileListComponent,
);
