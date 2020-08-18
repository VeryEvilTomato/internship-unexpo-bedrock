import {Alert} from 'react-native';

export const smsErrorHandler = response => {
  const {completed, cancelled, error} = response;

  if (error || cancelled) {
    Alert.alert(
      'Error',
      'No se completo el envío y por lo tanto no se hará la apertura',
      [
        {
          text: 'Continuar',
          onPress: () => {},
        },
      ],
    );
  } else if (completed) {
    Alert.alert('', 'Mensaje enviado', [
      {
        text: 'Continuar',
        onPress: () => {},
      },
    ]);
  }
};
