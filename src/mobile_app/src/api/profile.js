import axios from 'axios';
import {URL} from '@constants';
import {invalidateToken} from '@redux/actions';
import {randomId, inputValidation} from '@utils';
import {INPUT} from '@constants';

export const requestProfile = async (id, baseURL, token, dispatch) => {
  return axios({
    method: 'get',
    baseURL,
    url: `${URL.USERS}/${id}/`,
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

export const requestAllProfiles = (baseURL, token, dispatch) => {
  return axios({
    method: 'get',
    baseURL,
    url: `${URL.USERS}/`,
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

export const createProfile = async (baseURL, token, data, dispatch) => {
  const {first_name, last_name} = data;
  data.username =
    first_name.slice(0, 3).toLowerCase() +
    last_name.slice(0, 3).toLowerCase() +
    randomId(5);

  inputValidation([
    {string: data.username, type: INPUT.USER},
    {string: data.password, type: INPUT.PASSWORD},
  ]);

  return axios({
    method: 'post',
    baseURL,
    url: `${URL.USERS}/`,
    data,
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
