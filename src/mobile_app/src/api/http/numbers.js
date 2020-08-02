import axios from 'axios';
import {URL} from '@constants';
import {invalidateToken} from '@redux/actions';
import {STATUS} from '@constants';
import {Alert} from 'react-native';

export const requestNumber = async (id, baseURL, token, dispatch) => {
  return axios({
    method: 'get',
    baseURL,
    url: `${URL.NUMS}/${id}/`,
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      dispatch(invalidateToken());
    });
};

export const requestAllNumbers = async (baseURL, token, dispatch) => {
  return axios({
    method: 'get',
    baseURL,
    url: `${URL.NUMS}/`,
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
      dispatch(invalidateToken());
    });
};

export const createNumber = async (user_id, baseURL, token, data, dispatch) => {
  return axios({
    method: 'post',
    baseURL,
    url: `${URL.NUMS}/`,
    data: {number: data, user: user_id, logs: []},
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      Alert.alert('', 'Número correctamente agregado.', [
        {
          text: 'Continuar',
          onPress: () => {},
        },
      ]);
      return {
        status: STATUS.SUCCESS,
        data: response.data,
      };
    })
    .catch(error => {
      console.log(error);
      dispatch(invalidateToken());
    });
};

export const updateNumber = async (id, baseURL, token, data, dispatch) => {
  return axios({
    method: 'put',
    baseURL,
    url: `${URL.NUMS}/${id}/`,
    data,
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      Alert.alert('', 'Información actualizada.', [
        {
          text: 'Continuar',
          onPress: () => {},
        },
      ]);
      return {
        status: STATUS.SUCCESS,
        data: response.data,
      };
    })
    .catch(error => {
      dispatch(invalidateToken());
    });
};

export const deleteNumber = async (id, baseURL, token, dispatch) => {
  return axios({
    method: 'delete',
    baseURL,
    url: `${URL.NUMS}/${id}/`,
    responseType: 'json',
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      Alert.alert('', 'Número eliminado del sistema.', [
        {
          text: 'Continuar',
          onPress: () => {},
        },
      ]);
      return response;
    })
    .catch(error => {
      dispatch(invalidateToken());
    });
};
