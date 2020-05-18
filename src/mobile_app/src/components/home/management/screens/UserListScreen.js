import React from 'react';

import UserProfile from '../UserProfile.js'

import {
    Button,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

/*
 * User management through display of users and their 
 * information in a list, alongisde options such as
 * blocking them or deleting them off the system.
*/

export function UserListScreen({navigation}) {
    return (
        <View>
            <Button
                title="Agregar usuario nuevo"
                onPress={() => navigation.navigate("UserAddForm")}
            />
            { 
                responseExample === null ?
                    ""
                    :
                    responseExample.results.map((profile) =>
                        <UserProfile 
                            profile={profile}
                            key={profile.id}
                        />
                    )
            }
        </View>
    )
}

const responseExample = {
    "count": 1, 
    "results": [
        {
            "id": 2,
            "first_name": "Orlando",
            "last_name": "Guevara",
            "nums": [
                {
                    "id": 3,
                    "number": "4249384895",
                    "user": 2
                }
            ],
        },
        {
            "id": 3,
            "first_name": "José",
            "last_name": "Castillo",
            "nums": [
                {
                    "id": 4,
                    "number": "4241110000",
                    "user": 3
                }
            ],
        },
    ] 
}
