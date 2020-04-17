// imports packages
import { v4 as uuidv4 } from 'uuid';

// imports types of actions
import { SET_ALERT, REMOVE_ALERT } from './types';

// exports the set alert action
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  // generates a unique id for the alert
  const id = uuidv4();

  // dispatches the action to display a new alert
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });

  // dispatches the action to remove alert after the timeout parameters in milliseconds
  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      }),
    timeout
  );
};
