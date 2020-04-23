// imports the packages
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// imports redux
import { Provider } from 'react-redux';
import store from './store';

// imports the components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';

// imports our redux auth action to load a user
import { loadUser } from './actions/auth';

// imports our utils
import setAuthToken from './utils/setAuthToken';

// imports the css
import './App.css';

// if there is a token inside the local storage, sets the axios header
if (localStorage.token) {
  // sets the axios header using our util function
  setAuthToken(localStorage.token);
}

const App = () => {
  // implements the use effect hook, similar to a component will mount life cycle
  useEffect(() => {
    // dispatches the load user action
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
