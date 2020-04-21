// imports the packages
import axios from 'axios';

const setAuthToken = (token) => {
  // if there is a token in the local storage of the user, sets some headers for axios
  if (token) {
    // sets the x-auth-token header for axios
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // deletes the x-auth-token header from axios
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// exports the utils function
export default setAuthToken;
