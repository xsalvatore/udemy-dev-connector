// imports the packages
import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// imports our redux actions
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  // implements the usestate hook for the registration form
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // destructuring the form data state
  const { email, password } = formData;

  // updates the state of the form
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submits the registration form
  const onSubmit = async (e) => {
    // prevents the browser from refreshing the page
    e.preventDefault();

    // logs in the user through redux login action
    login(email, password);
  };

  // if the user is authenticated, redirects him to the dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'
            required
          />
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
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account ? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

// holds the types of props passed to the component
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// holds the pieces of state from redux we need inside this component
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// connects our react component with redux
export default connect(mapStateToProps, { login })(Login);
