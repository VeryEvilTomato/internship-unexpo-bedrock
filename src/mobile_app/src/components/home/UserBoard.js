import React, {useEffect} from 'react';

import {Button, Text} from 'react-native-elements';

import {View} from 'react-native';

/*
 * Active session user information componen
 */

export default function UserBoard({userData}) {
  let {first_name, last_name, usersdata} = userData;
  let {accessLevel} = usersdata;

  useEffect(() => {}, []);

  return (
    <View>
      <Text>
        ¡Bienvenid@ {first_name} {last_name}!
      </Text>
      {accessLevel === 'AL' ? (
        <Text>Usted posee derechos de administrador</Text>
      ) : (
        <View />
      )}
    </View>
  );
}
