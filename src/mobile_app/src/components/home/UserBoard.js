import React, {useEffect} from 'react';

import {Button, Text} from 'react-native-elements';

import {View} from 'react-native';

/*
 * Active session user information componen
 */

export default function UserBoard({userData, isAdmin}) {
  let {first_name, last_name} = userData;

  return (
    <View>
      <Text>
        ¡Bienvenid@ {first_name} {last_name}!
      </Text>
      {isAdmin ? <Text>Usted posee derechos de administrador</Text> : <View />}
    </View>
  );
}
