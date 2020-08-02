import React, {useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';

import {UserProfileList} from '../UserProfileList';
import styles from '@styles';

export const UserListScreen = ({navigation}) => {
  const [isFocused, setFocus] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFocus(true);
      return () => {
        setFocus(false);
      };
    }, []),
  );

  return (
    <View style={styles.container.columnBetween}>
      <View style={styles.container.rowEvenly}>
        <Text style={[styles.font.dark, styles.container.flexItem2]}>
          Edición de información y permisos.
        </Text>
        <Button
          title="Nuevo"
          buttonStyle={styles.button.small}
          containerStyle={styles.container.flexItem1}
          titleStyle={styles.font.dark}
          icon={styles.icon.contactAdd()}
          onPress={() => {
            navigation.navigate('UserForm');
          }}
        />
      </View>
      <Divider style={styles.divider.normal} />
      {isFocused ? <UserProfileList navigation={navigation} /> : <View />}
    </View>
  );
};
