// imports our different action types
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// holds the initial state
const initialState = [];

// exports the different alert reducers
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // displays an alert to the user on the ui
    case SET_ALERT:
      return [...state, payload];
    // removes an alert on the ui
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    // defaults
    default:
      return state;
  }
}
