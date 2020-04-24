// imports the packages
import axios from 'axios';

// imports redux action
import { setAlert } from './alert';

// imports redux types
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';

// gets the current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // awaits the api call made using axios
    const res = await axios.get('/api/profile/me');

    // dispatches the get profile redux action with the response data received by axios
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    // dispatches the profile error redux action with the different messages and status of the error that happened
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// creates our updates a profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    // holds the config of the axios headers since we are doing a post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // holds the response of the axios post
    const res = await axios.post('/api/profile', formData, config);

    // dispatches the get profile redux action to get the updated profile
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    // dispatches the set alert redux action
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // if the user was creating his profile for the first time, we redirect afterward
    if (!edit) {
      // pushes the user to the url /dashboard an synchs with the history
      history.push('/dashboard');
    }
  } catch (err) {
    // holds the errors, if there is any
    const errors = err.response.data.errors;

    // if there was any errors, we dispatch the set alert redux action with the error message
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatches the profile error redux action with the error messages and errror status
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    // holds the config of the axios headers since we are doing a post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // holds the response of the axios post
    const res = await axios.put('/api/profile/experience', formData, config);

    // dispatches the update profile redux actions with the updated profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatches the set alert redux action with custom message
    dispatch(setAlert('Experience Added', 'success'));

    // redirects the user to the /dashboard url
    history.push('/dashboard');
  } catch (err) {
    // holds the errors, if there is any
    const errors = err.response.data.errors;

    // if there was any errors, we dispatch the set alert redux action with the error message
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatches the profile error redux action with the error messages and errror status
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    // holds the config of the axios headers since we are doing a post request
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // holds the response of the axios post
    const res = await axios.put('/api/profile/education', formData, config);

    // dispatches the update profile redux actions with the updated profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatches the set alert redux action with custom message
    dispatch(setAlert('Education Added', 'success'));

    // redirects the user to the /dashboard url
    history.push('/dashboard');
  } catch (err) {
    // holds the errors, if there is any
    const errors = err.response.data.errors;

    // if there was any errors, we dispatch the set alert redux action with the error message
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // dispatches the profile error redux action with the error messages and errror status
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// deletes an experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    // holds the axios response delete
    const res = await axios.delete(`/api/profile/experience/${id}`);

    // dispatches the update profile redux actions with the updated profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatches the set alert redux action with custom message
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    // dispatches the profile error redux action with the error messages and errror status
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// deletes an education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    // holds the axios response delete
    const res = await axios.delete(`/api/profile/education/${id}`);

    // dispatches the update profile redux actions with the updated profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    // dispatches the set alert redux action with custom message
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    // dispatches the profile error redux action with the error messages and errror status
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// deletes account and profile
export const deleteAccount = () => async (dispatch) => {
  // pops up a confirmation alert to the user for confirmation
  if (window.confirm('Are you sure? This can NOT be undone')) {
    try {
      // holds the axios response delete
      const res = await axios.delete('/api/profile/');

      // dispatches the clear profile redux action
      dispatch({ type: CLEAR_PROFILE });

      // dispatches the account deleted redux action
      dispatch({ type: ACCOUNT_DELETED });

      // dispatches the set alert redux action with custom message
      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      // dispatches the profile error redux action with the error messages and errror status
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
