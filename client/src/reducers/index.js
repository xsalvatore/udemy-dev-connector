// imports redux
import { combineReducers } from 'redux';

// imports reducers
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

// exports the combined reducers
export default combineReducers({ alert, auth, profile, post });
