import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
    ScrollView,
    FlatList,
} from 'react-native';

import UserProfile from './UserProfile'
import { requestAllProfiles } from '@api'
import { invalidateToken } from '@redux/actions';

const UserProfileListComponent = ({request, dispatch}) => {
    const { baseURL, token } = request;
    const [ userDataList, setUserDataList ] = useState([]);

    useEffect(() => {
        setUserDataList([]);
        requestAllProfiles(
            baseURL, 
            token
        ).then((response) => {
            setUserDataList(response.data.results);
        }).catch((error) => {
            dispatch(invalidateToken());
        })
    }, [])

    return (
        <View style={{ height: 500}}>
            <FlatList
                data={userDataList}
                renderItem={({item}) => <UserProfile profile={item}/>}
                keyExtractor={(item) => item.id}
                extraData={userDataList}
            />
        </View>
    )
}

export const UserProfileList = connect(state => state)(UserProfileListComponent)
