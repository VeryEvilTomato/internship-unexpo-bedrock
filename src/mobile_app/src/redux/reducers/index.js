import {combineReducers} from 'redux';

import requestReducers from './requestReducers';

export default combineReducers({
  request: requestReducers,
});

