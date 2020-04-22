import axios from 'axios';
// eslint-disable-next-line
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// gets the current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
