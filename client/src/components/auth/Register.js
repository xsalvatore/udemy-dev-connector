// imports the packages
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// imports our redux alerts actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // implements the usestate hook for the registration form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // destructuring the form data state
  const { name, email, password, password2 } = formData;

  // updates the state of the form
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submits the registration form
  const onSubmit = async (e) => {
    // prevents the browser from refreshing the page
    e.preventDefault();

    // if the passwords don't match, we display an alert
    if (password !== password2) {
      // displays a new alert to the user with a custom message and a red color
      setAlert('Passwords do not match', 'danger ');
    } else {
      // registers the new user through the register redux action
      register({ name, email, password });
    }
  };

  // if the user is authenticated, redirects him to the dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => onChange(e)} />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email Address' value={email} onChange={(e) => onChange(e)} name='email' />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => onChange(e)}
            name='password2'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account ? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

// holds the types of props passed to the component
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// holds the pieces of state from redux we need inside this component
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// connects our react component with redux
export default connect(mapStateToProps, { setAlert, register })(Register);
