import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
    ScrollView,
} from 'react-native';

import UserProfile from './UserProfile'
import { requestAllProfiles } from '@api'
import { invalidateToken } from '@redux/actions';

const UserProfileListComponent = ({request, dispatch}) => {
    const { baseURL, token } = request;
    const [ userDataList, setUserDataList] = useState(null);

    useEffect(() => {
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
        <ScrollView>
            <View>
                {   
                    userDataList === null ?
                        <Text>Cargando lista de usuarios...</Text>
                        :
                        userDataList.map((profile, index) =>
                            <UserProfile 
                                profile={profile}
                                key={index}
                            />
                        )
                }
            </View>
        </ScrollView>
    )
}

export const UserProfileList = connect(state => state)(UserProfileListComponent)
