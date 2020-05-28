import axios from 'axios';
import {URL} from '@constants';
import {invalidateToken} from '@redux/actions';
import {randomId, inputValidation} from '@utils';
import {INPUT, STATUS} from '@constants';

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
  let errorMsgs = [];
  const {password, repeatPassword} = data;
  const form = [
    {string: data.password, type: INPUT.PASSWORD},
    {string: data.first_name, type: INPUT.FIRST_NAME},
    {string: data.last_name, type: INPUT.LAST_NAME},
  ];

  if (password !== repeatPassword) {
    errorMsgs.push({type: 'password', message: 'Sus contraseñas no coinciden'});
  }

  form.forEach(field => {
    errorMsgs.push(...inputValidation(field));
  });

  if (errorMsgs.length > 0) {
    return {
      status: STATUS.ERROR,
      data: errorMsgs,
    };
  } else {
    const {first_name, last_name} = data;
    data.username =
      first_name.slice(0, 2).toLowerCase() +
      last_name.slice(0, 2).toLowerCase() +
      randomId(5);

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
        return {
          status: STATUS.SUCCESS,
          data: response.data,
        };
      })
      .catch(error => {
        console.log(error);
        dispatch(invalidateToken());
      });
  }
};
