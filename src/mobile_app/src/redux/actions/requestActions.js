import axios from 'axios';
import {retrieveStorageTokens} from '@utils/asyncStorage';

export const GET_TOKEN = 'GET_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const INVALIDATE_TOKEN = 'INVALIDATE_TOKEN';
export const DECODE_JWT = 'DECODE_JWT';

const requestToken = () => {
  return {
    type: GET_TOKEN,
  };
};

export const receiveToken = token => {
  return {
    type: RECEIVE_TOKEN,
    token,
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

export function authenticateUser(credentials, request) {
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
        alert(
          'Credenciales inválidos, verifique el nombre de usuario y contraseña',
        );
      });
  };
}

export function invalidateJWT(request) {
  return async dispatch => {
    const token = retrieveStorageTokens();
    const baseURL = request.baseURL;
    const api = axios.create({
      baseURL,
    });

    if (token === null) {
      dispatch(invalidateToken());
      return null;
    }

    return api({
      method: 'post',
      url: '/token/refresh',
      data: token.refresh,
    })
      .then(response => {
        dispatch(receiveToken(response.data));
        return response.data;
      })
      .then(responseToken => {
        if (responseToken.access) {
          dispatch(decodeJWT());
        }
      })
      .catch(error => {
        dispatch(invalidateToken());
        alert(
          'Credenciales inválidos, verifique el nombre de usuario y contraseña',
        );
      });
  };
}
