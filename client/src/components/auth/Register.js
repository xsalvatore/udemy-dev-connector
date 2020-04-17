// imports the packages
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// imports our redux alerts actions
import { setAlert } from '../../actions/alert';

const Register = ({ setAlert }) => {
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

    // if both passwords don't match, logs a custom error message into the console (temporary)
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger ');
    } else {
      console.log('success');
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => onChange(e)} required />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'
            required
          />
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => onChange(e)}
            name='password2'
            minLength='6'
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
};

// exports our components with connect from react-redux
export default connect(null, { setAlert })(Register);
