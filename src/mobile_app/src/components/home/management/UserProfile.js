import React from 'react';

import {
    Button,
    Text,
} from 'react-native-elements';

import {
    View,
} from 'react-native';

export default function UserProfile(props) {
    const {profile} = props;
    return (
        <View style={{backgroundColor: "#cfe0ff", marginTop: 5}}>
            <Text>Nombre: {profile.first_name} {profile.last_name}</Text>
            <Text>Estado: Activo</Text>
            <View>
                <Text>Numeros:</Text>
                {
                    profile.nums.map((phone, index) => 
                        <View key={index}>
                            <Text>{phone.number}</Text>
                        </View>
                    )
                }
            </View>
            <Button 
                title="Bloquear"
            />
        </View>
    )
}
