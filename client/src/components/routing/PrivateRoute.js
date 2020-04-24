// imports the packages
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

// holds the type of props we are expecting
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// maps the redux state to our props
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// exports the component using connect from react-redux
export default connect(mapStateToProps)(PrivateRoute);
