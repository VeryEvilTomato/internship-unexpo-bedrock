import {Linking, Alert} from 'react-native';

export const requestLogsDate = async () => {};

export const requestAllLogs = async () => {};

export const createLog = async params => {
  const {baseNUMBER} = params;
  Alert.alert(
    'Aviso',
    'Llame al número que se colocará en pantalla para abrir el portón',
    [
      {
        text: 'Regresar',
        onPress: () => {},
      },
      {
        text: 'Continuar',
        onPress: () => {
          Linking.openURL(`tel:${baseNUMBER}`, () => {
            console.log('Opened');
          });
        },
      },
    ],
  );
};
