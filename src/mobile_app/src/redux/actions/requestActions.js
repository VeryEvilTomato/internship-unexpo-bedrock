import axios from 'axios';

export const GET_TOKEN = 'GET_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const INVALIDATE_TOKEN = 'INVALIDATE_TOKEN';
export const DECODE_JWT = 'DECODE_JWT';
export const CHANGE_OPMODE = 'CHANGE_OPMODE';

const requestToken = () => {
  return {
    type: GET_TOKEN,
  };
};

export const receiveToken = token => {
  return {
    type: RECEIVE_TOKEN,
    payload: token,
  };
};

export const invalidateToken = () => {
  return {
    type: INVALIDATE_TOKEN,
  };
};

export const decodeJWT = () => {
  return {
    type: DECODE_JWT,
  };
};

export const changeOpMode = mode => {
  return {
    type: CHANGE_OPMODE,
    payload: mode,
  };
};

export function authenticateUser(credentials, request, Alert) {
  return async dispatch => {
    dispatch(requestToken());

    const baseURL = request.baseURL;
    const api = axios.create({
      baseURL,
    });

    return api({
      method: 'post',
      url: '/token/',
      data: credentials,
    })
      .then(response => {
        dispatch(receiveToken(response.data));
        return response.data;
      })
      .then(token => {
        if (token.access) {
          dispatch(decodeJWT());
          return token;
        }
      })
      .catch(error => {
        dispatch(invalidateToken());
        Alert.alert(
          '',
          'Credenciales inválidos, verifique el nombre de usuario y contraseña',
          [{text: 'Continuar', onPress: () => {}}],
        );
      });
  };
}

export function invalidateJWT() {
  return async (dispatch, getState) => {
    const {request} = getState();
    const api = axios.create({
      baseURL: request.baseURL,
    });

    if (request.token === null) {
      dispatch(invalidateToken());
      return null;
    }

    return api({
      method: 'post',
      url: '/toke/refresh/',
      data: {refresh: request.token.refresh},
    })
      .then(response => {
        dispatch(
          receiveToken({...request.token, access: response.data.access}),
        );
        return response.data;
      })
      .then(responseToken => {
        if (responseToken.access) {
          dispatch(decodeJWT());
        }
      })
      .catch(error => {
        dispatch(invalidateToken());
      });
  };
}
