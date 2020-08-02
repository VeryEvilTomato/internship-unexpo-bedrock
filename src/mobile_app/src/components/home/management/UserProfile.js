import React from 'react';
import {Text, Divider} from 'react-native-elements';
import {View, TouchableOpacity} from 'react-native';

import styles from '@styles';

/*
 * Basic user information display.
 */

export default function UserProfile({profile, navigation}) {
  return (
    <TouchableOpacity
      style={[styles.container.columnBetween, styles.card.wide]}
      onPress={() => {
        navigation.navigate('UserDetail', {
          ...profile,
          recentlyCreated: false,
        });
      }}>
      <View>
        <Text style={[styles.font.dark]}>
          {profile.first_name} {profile.last_name}
        </Text>
        <Divider style={styles.divider.small} />
        <View style={styles.container.rowStart}>
          <Text style={[styles.font.dark]}>Número(s): </Text>
          <View style={styles.container.columnStart}>
            {profile.nums.length > 0 ? (
              profile.nums.slice(0, 2).map((phone, index) => (
                <View key={index}>
                  <Text style={styles.font.darkNormal}>
                    {phone.number}
                    {index === 1 ? '... ' : ', '}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.font.darkNormal}>
                {' '}
                No hay números almacenados.
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
