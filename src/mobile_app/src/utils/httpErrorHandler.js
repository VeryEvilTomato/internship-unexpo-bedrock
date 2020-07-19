import {Alert} from 'react-native';

export const httpErrorHandler = (error, dispatch, action) => {
  let errorMessage = 'Error durante creación de mensaje de error.';
  if (error.response) {
    errorMessage = (() => {
      switch (error.response.status) {
        case 400:
          return 'El sistema de control del portón no se encuentra funcional.';
        case 401:
          if (action !== undefined) {
            dispatch(action());
          }
          return 'Credenciales erróneas, chequee su contraseña y usuario.';
        case 404:
          return 'La información solicitada no existe.';
        default:
          return 'Error inesperado.';
      }
    })();
  } else if (error.request) {
    errorMessage = 'No se pudo conectar al servidor, chequee su conexión.';
  } else {
    errorMessage = 'Error inesperado';
  }

  Alert.alert('Error', errorMessage, [{text: 'Continuar', onPress: () => {}}]);
};
