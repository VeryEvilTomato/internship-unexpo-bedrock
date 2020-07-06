import axios from 'axios';
import {Alert} from 'react-native';

import {STATUS, URL} from '@constants';
import {invalidateJWT} from '@redux/actions';

export const requestLogsDate = async () => {
  // To-do
};

export const requestAllLogs = async (params, dispatch) => {
  const {baseURL, token} = params;

  return axios({
    method: 'get',
    baseURL,
    url: `${URL.LOGS}/`,
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      return {
        status: STATUS.SUCCESS,
        data: response.data,
      };
    })
    .catch(error => {
      dispatch(invalidateJWT());
    });
};

export const createLog = async (params, dispatch) => {
  const {baseURL, token} = params;
  let number = null;

  if (params.nums === []) {
    return null;
  } else {
    number = params.nums[0].id;
  }

  return axios({
    method: 'post',
    baseURL,
    url: `${URL.LOGS}/`,
    data: {number},
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
    .then(response => {
      Alert.alert('', 'Señal recibida por el portón.', [
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
      dispatch(invalidateJWT());
    });
};
