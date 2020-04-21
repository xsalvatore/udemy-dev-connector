// imports our different types of action
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';

// holds the initial state of auth
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  // destructuring the action
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      // returns the updated state
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // sets the token inside the local storage
      localStorage.setItem('token', payload.token);

      // returns the updated state
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // removes the token from the local storage
      localStorage.removeItem('token');

      // returns the updated state
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      // returns the state
      return state;
  }
}
