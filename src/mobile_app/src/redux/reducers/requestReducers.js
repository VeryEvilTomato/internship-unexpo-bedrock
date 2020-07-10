import * as actions from '../actions';
import {clearStorageTokens} from '@utils/asyncStorage';

var jwtDecode = require('jwt-decode');

const requestReducers = (state = {}, action) => {
  switch (action.type) {
    case actions.GET_TOKEN:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case actions.RECEIVE_TOKEN:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        token: action.payload,
      };
    case actions.INVALIDATE_TOKEN:
      // Clear registered tokens in memory and storage
      clearStorageTokens();
      return {
        ...state,
        isFetching: false,
        token: {access: null, refresh: null},
        didInvalidate: true,
        userId: null,
      };
    case actions.DECODE_JWT:
      // Decode JWT in order to extract User ID
      let {user_id} = jwtDecode(state.token.access);
      return {
        ...state,
        userId: user_id,
      };
    case actions.CHANGE_OPMODE:
      return {
        ...state,
        mode: action.payload,
      };
    case actions.SET_URL:
      return {
        ...state,
        baseURL: action.payload,
      };
    case actions.SET_SYS_NUM:
      return {
        ...state,
        baseNUMBER: action.payload,
      };

    default:
      return state;
  }
};

export default requestReducers;
