import React from 'react';

import {Button, Text} from 'react-native-elements';

import {View} from 'react-native';

/*
 * Basic user information display.
 */

export default function UserProfile({profile, navigation}) {
  return (
    <View
      style={{
        backgroundColor: '#cfe0ff',
        marginTop: 5,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>
          Nombre: {profile.first_name} {profile.last_name}
        </Text>
        <View>
          <Text>Numeros:</Text>
          {profile.nums.map((phone, index) => (
            <View key={index}>
              <Text>{phone.number}</Text>
            </View>
          ))}
        </View>
      </View>
      <Button
        title="Perfil"
        onPress={() => {
          navigation.navigate('UserDetail', {
            ...profile,
            recentlyCreated: false,
          });
        }}
      />
    </View>
  );
}
