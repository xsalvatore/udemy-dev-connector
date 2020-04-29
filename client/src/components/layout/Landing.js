import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  // if the user is authenticated, prevents to go back to the landing page
  if (isAuthenticated) {
    // redirects the user to it's dashboard
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// holds the type of props expecting
Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

// maps redux state to our props
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// exports the component using connect from react-redux
export default connect(mapStateToProps)(Landing);
