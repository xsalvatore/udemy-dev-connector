// imports redux
import { combineReducers } from 'redux';

// imports reducers
import alert from './alert';
import auth from './auth';

// exports the combined reducers
export default combineReducers({ alert, auth });
