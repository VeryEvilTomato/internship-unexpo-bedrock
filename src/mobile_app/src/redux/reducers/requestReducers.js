import * as actions from '../actions';

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
        token: action.token,
      };
    case actions.INVALIDATE_TOKEN:
      return {
        ...state,
        isFetching: false,
        token: {access: null, refresh: null},
        didInvalidate: true,
      };
    case actions.DECODE_JWT:
      let {user_id} = jwtDecode(state.token.access);
      return {
        ...state,
        userId: user_id,
      };
    default:
      return state;
  }
};

export default requestReducers;
