// imports the packages
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// imports our root reducer
import rootReducer from './reducers';

// holds the initial state of the app
const initialState = {};

// holds the middlewares for the redux store
const middleware = [thunk];

// holds the redux store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// exports the store
export default store;
