import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
import {View} from 'react-native';

import styles from '@styles';

/*
 * Active session user information componen
 */
const UserBoardComponent = ({userData, isAdmin}) => {
  const {first_name, last_name} = userData;

  return (
    <View>
      <Text style={styles.font.darkLarge}>
        ¡Bienvenid@ {first_name} {last_name}!
      </Text>
      {isAdmin ? (
        <Text style={styles.font.darkNormal}>
          Usted posee derechos de administrador
        </Text>
      ) : (
        <View />
      )}
    </View>
  );
};

export const UserBoard = connect(state => state)(UserBoardComponent);
