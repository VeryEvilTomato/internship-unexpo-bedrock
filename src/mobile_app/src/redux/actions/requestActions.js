import axios from 'axios';

import {saveStorageOptions} from '@utils/asyncStorage';
import {httpErrorHandler} from '@utils';
import {Alert} from 'react-native';

export const GET_TOKEN = 'GET_TOKEN';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const INVALIDATE_TOKEN = 'INVALIDATE_TOKEN';
export const DECODE_JWT = 'DECODE_JWT';
export const CHANGE_OPMODE = 'CHANGE_OPMODE';
export const SET_URL = 'SET_URL';
export const SET_SYS_NUM = 'SET_SYS_NUM';

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

export const setUrl = url => {
  return {
    type: SET_URL,
    payload: url,
  };
};

export const setSysNum = num => {
  return {
    type: SET_SYS_NUM,
    payload: num,
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
        httpErrorHandler(error, dispatch, invalidateToken);
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
        httpErrorHandler(error, dispatch, invalidateToken);
      });
  };
}

export function setOptions(options, showMsg) {
  return async (dispatch, getState) => {
    const {request} = getState();

    return saveStorageOptions(options)
      .then(options => {
        dispatch(setSysNum(options.baseNUMBER));
        dispatch(setUrl(options.baseURL));
        if (showMsg) {
          Alert.alert('Aviso', 'Configuración correctamente actualizada');
        }
      })
      .catch(error => {
        //
      });
  };
}

export function setOptionsDefault() {
  return async (dispatch, getState) => {
    const {request} = getState();
    const options = {
      baseNUMBER: '+584148302419',
      baseURL: 'http://192.168.0.108:8000/api',
    };

    return saveStorageOptions(options)
      .then(options => {
        dispatch(setSysNum(options.baseNUMBER));
        dispatch(setUrl(options.baseURL));
        return true;
      })
      .catch(error => {
        //
      });
  };
}
