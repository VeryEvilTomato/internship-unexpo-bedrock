import axios from 'axios';
import {URL} from '@constants';
import {invalidateToken} from '@redux/actions';
import {STATUS} from '@constants';
import {Alert} from 'react-native';

export const requestUsersdata = async (id, baseURL, token, dispatch) => {
  return axios({
    method: 'get',
    baseURL,
    url: `${URL.USERSDATA}/${id}/`,
    responseType: 'json',
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

export const requestAllUsersdata = async (baseURL, token, dispatch) => {
  return axios({
    method: 'get',
    baseURL,
    url: `${URL.USERSDATA}/`,
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

export const createUsersdata = async (
  user_id,
  baseURL,
  token,
  data,
  dispatch,
) => {
  return axios({
    method: 'post',
    baseURL,
    url: `${URL.USERSDATA}/`,
    data: {...data, user: user_id},
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
      console.log(error);
      dispatch(invalidateToken());
    });
};

export const updateUsersdata = async (id, baseURL, token, data, dispatch) => {
  return axios({
    method: 'put',
    baseURL,
    url: `${URL.USERSDATA}/${id}/`,
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
      console.log(error);
      dispatch(invalidateToken());
    });
};
