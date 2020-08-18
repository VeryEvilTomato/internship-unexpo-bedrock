import {Alert} from 'react-native';
import SendSMS from 'react-native-sms';

export const requestLogsDate = async () => {};

export const requestAllLogs = async () => {};

const options = {
  successTypes: ['sent', 'queued'],
};

export const createLog = async (params, dispatch) => {
  const {baseNUMBER} = params;
  return new Promise(resolve => {
    // Send SMS
    Alert.alert(
      'Advertencia',
      'Se abrirá su mensajero para enviar un SMS al sistema y abrir el portón, por favor enviar sin alterar el mensaje automático',
      [
        {
          text: 'Regresar',
          onPress: () => {},
        },
        {
          text: 'Continuar',
          onPress: () => {
            SendSMS.send(
              {...options, recipients: [baseNUMBER], body: 'gate_open'},
              (completed, cancelled, error) => {
                resolve({completed, cancelled, error});
              },
            );
          },
        },
      ],
      {cancelable: false},
    );
  });
};
